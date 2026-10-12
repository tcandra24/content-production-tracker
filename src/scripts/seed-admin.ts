import 'dotenv/config'
import { auth } from "#/lib/auth";

async function seedAdmin() {
  const result = await auth.api.signUpEmail({
    body: {
      email: "<EMAIL>",
      password: "<PASSWORD>",
      name: "<NAME>",
    },
  });

  console.log("Admin created:", result);
}

seedAdmin();
