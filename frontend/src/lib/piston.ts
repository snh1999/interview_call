const RAPID_API_KEY = import.meta.env.VITE_PISTON_API_KEY;
const RAPID_API_HOST = "paiza-io.p.rapidapi.com";
const LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
};

export async function executeCode(
  language: string,
  code: string
): Promise<{ success: boolean; output?: string; error?: string }> {
  try {
    const paizaLang = LANGUAGE_MAP[language];
    if (!paizaLang) {
      return { success: false, error: `Unsupported language: ${language}` };
    }

    // Step 1: Create the runner
    const createRes = await fetch(`https://${RAPID_API_HOST}/runners/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": RAPID_API_HOST,
      },
      body: new URLSearchParams({
        language: paizaLang,
        source_code: code,
        input: "",
        longpoll: "true",
        longpoll_timeout: "10",
      }),
    });

    const createData = await createRes.json();
    const runnerId = createData.id;

    if (!runnerId) {
      return { success: false, error: "Failed to create runner" };
    }

    // Step 2: Poll for results
    const details = await pollForResult(runnerId);

    const stdout = details.stdout || "";
    const stderr = details.stderr || "";
    const buildStderr = details.build_stderr || "";

    if (buildStderr) {
      return { success: false, output: stdout, error: buildStderr };
    }
    if (stderr) {
      return { success: false, output: stdout, error: stderr };
    }

    return {
      success: true,
      output: stdout || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Execution failed: ${(error as Error).message}`,
    };
  }
}

async function pollForResult(
  runnerId: string,
  maxAttempts = 10,
  intervalMs = 1500
): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));

    const res = await fetch(
      `https://${RAPID_API_HOST}/runners/get_details?id=${runnerId}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST,
        },
      }
    );

    const data = await res.json();
    console.log(`Poll attempt ${i + 1}:`, data.status);

    if (data.status === "completed") {
      return data;
    }

    // If still running, loop and try again
  }

  throw new Error("Execution timed out after polling");
}
