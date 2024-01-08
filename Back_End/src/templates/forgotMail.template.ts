export const emailTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Forgot Password</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }

      table {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
      }

      h1 {
        color: #333333;
      }

      p {
        color: #555555;
      }

      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <h1>Forgot Password?</h1>
          <p>Don't worry, it happens to the best of us. Let's get you back on track!</p>
          <p>Your new password is: <strong><%= text %></strong></p>
          <p>Please change your password after logging in for security reasons.</p>
          <p>Thank you!</p>
          <a href="#" class="button">Login Now</a>
        </td>
      </tr>
    </table>
  </body>
</html>`;
