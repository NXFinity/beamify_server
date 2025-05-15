module.exports = function verifyEmailTemplate({ verificationCode, verificationUrl, appName = 'Beamify', supportEmail = 'support@beamify.online' }) {
  // Ensure all links and emails use beamify.online
  const safeSupportEmail = 'support@beamify.online';
  const safeVerificationUrl = verificationUrl.replace('your-app.com', 'beamify.online');
  return `
    <div style="background: #f4f6fb; padding: 48px 0; min-height: 100vh;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 18px; box-shadow: 0 8px 36px rgba(60,72,88,0.14); overflow: hidden; font-family: Arial, sans-serif; border: 1px solid #ececec;">
        <tr>
          <td style="background: #fff; padding: 36px 0 18px 0; text-align: center; border-bottom: 4px solid #ff3c00;">
            <img src='http://beamify.online/images/icon.png' alt='Beamify Logo' style='width: 56px; height: 56px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;' />
            <span style="font-size: 30px; font-weight: bold; color: #ff3c00; letter-spacing: 2px; display: block;">${appName}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 36px 36px 20px 36px; text-align: center;">
            <h2 style="color: #1e293b; margin-bottom: 16px; font-size: 24px; font-weight: 700; letter-spacing: 1px; text-align: center;">Welcome to ${appName}!</h2>
            <p style="font-size: 17px; color: #222; margin: 0 0 22px 0; line-height: 1.6; text-align: center;">Thank you for registering. Please verify your account to get started.</p>
            <div style="margin: 32px 0 22px 0; text-align: center;">
              <div style="font-size: 16px; color: #555; margin-bottom: 8px; text-align: center;">Your verification code:</div>
              <div style="font-size: 16px; font-weight: 400; letter-spacing: 1px; background: #f8f8f8; color: #444; padding: 10px 0; border-radius: 6px; text-align: center; margin-bottom: 22px; border: 1px solid #ececec;">
                ${verificationCode}
              </div>
              <div style="text-align: center; margin: 22px 0;">
                <a href="${safeVerificationUrl}" style="display: inline-block; background: #ff3c00; color: #fff; padding: 16px 36px; border-radius: 10px; text-decoration: none; font-size: 18px; font-weight: bold; box-shadow: 0 2px 10px rgba(255,60,0,0.13); transition: background 0.2s; border: 1px solid #ff3c00;">Verify My Account</a>
              </div>
            </div>
            <p style="font-size: 15px; color: #666; margin-top: 36px; line-height: 1.5; text-align: center;">If you did not request this, you can ignore this email.</p>
            <p style="font-size: 15px; color: #666; margin-top: 10px; text-align: center;">Need help? Contact <a href="mailto:${safeSupportEmail}" style="color: #ff3c00; text-decoration: underline; font-weight: bold;">${safeSupportEmail}</a></p>
          </td>
        </tr>
        <tr>
          <td style="background: #f4f6fb; text-align: center; padding: 24px 0 12px 0; font-size: 14px; color: #999; border-top: 1px solid #e5e7eb;">
            <a href="http://beamify.online" style="color: #ff3c00; font-weight: bold; text-decoration: none; font-size: 15px;">Beamify</a> © 2025 EN|IX Llc. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  `;
};
