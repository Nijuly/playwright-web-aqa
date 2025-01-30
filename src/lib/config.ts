export const config = {
  auth: {
    errors: {
      login: [
        "Email or password is incorrect",
        "This is an invalid password for this email",
        'Provided password is for the user "user25@example.com". Use another one.',
        "Oh, no! :(",
        "",
      ],
    },
    config: {
      hasAuthCookieExposed: true, // TRUE or FALSE, if yes, email/password are stored in cookie exposed, default TRUE
    },
  },
  convert: {
    errors: {
      pdf: ["File is too large", "File is empty", "File is corrupted"],
      other: ["Invalid file format", "No-no-no! PDF only!"],
    },
    config: {
      isAuthRequired: true, // TRUE or FALSE, if yes redirects back to auth on direct page load, default TRUE
      pageLoadDelay: process.env.PAGE_LOAD_DELAY
        ? Number(process.env.PAGE_LOAD_DELAY)
        : 5_000, // Milliseconds, 0 to disable, default 5_000
      conversionTime: 5_000, // Milliseconds, 0 to disable, default 10_000
      pdfErrorChance: process.env.PDF_ERROR_CHANCE
        ? Number(process.env.PDF_ERROR_CHANCE)
        : 0.5, // 0 to 1, 0.5 = 50%, chance for the random error on PDF convert button click, default 0.5
      hideDownloadButtonChance: process.env.HIDE_DOWNLOADED_BUTTON_CHANCE
        ? Number(process.env.HIDE_DOWNLOADED_BUTTON_CHANCE)
        : 0.3, // 0 to 1, 0.5 = 50%, chance for the download button to be hidden, default 0.3
      fileDownloadCrashChance: process.env.FILE_DOWNLOADED_CRASH_CHANCE
        ? Number(process.env.FILE_DOWNLOADED_CRASH_CHANCE)
        : 0.5, // 0 to 1, 0.5 = 50%, chance for the download to crash and return 500, default 0.5
      emptyResultFileChance: process.env.EMPTY_RESULT_CRASH_CHANCE
        ? Number(process.env.EMPTY_RESULT_CRASH_CHANCE)
        : 0.3, // 0 to 1, 0.5 = 50%, chance for resulting DOCX file to be empty, default 0.3
    },
  },
  health: {
    config: {
      hasInfiniteLoop: true, // TRUE or FALSE, if yes, the health check will hang the app, otherwise returns 200, default TRUE
    },
  },
} as const;
