// app/api/captcha.js
export default function getRecaptchaToken() {
  return new Promise((resolve, reject) => {
    // Utilisez "grecaptcha" directement après que le script soit prêt
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("RECAPTCHA_SITE_KEY", { action: "submit" })
        .then((token) => {
          resolve(token);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
