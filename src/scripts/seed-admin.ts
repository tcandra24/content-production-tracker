import 'dotenv/config'
import { auth } from "#/lib/auth";

async function seedAdmin() {
  const result = await auth.api.signUpEmail({
    body: {
      email: "tcandra3@google.com",
      password: "perseus-tito3",
      name: "tito candra3",
    },
  });

  console.log("Admin berhasil dibuat:", result);
}

seedAdmin();
