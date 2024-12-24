const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Supabase setup
const supabaseUrl = "https://ibkibtkvcmbhfgyiskpt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlia2lidGt2Y21iaGZneWlza3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNTg2MzAsImV4cCI6MjA0OTczNDYzMH0.zpdIlRA9pOzJFU-mq6c89FT5-IwzdTOZk6EbnYqH6HQ";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/loginpage", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/indexadmin", (req, res) => {
  res.sendFile(__dirname + "/views/indexadmin.html");
});

app.get("/inputevent", (req, res) => {
  res.sendFile(__dirname + "/views/inputevent.html");
});

for (let i = 1; i <= 6; i++) {
  app.get(`/event${i}`, (req, res) => {
    res.sendFile(__dirname + `/views/event/event${i}.html`);
  });
}


// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Periksa apakah pengguna dengan email tersebut ada di database
  const { data, error } = await supabase
    .from("users")
    .select("plain_password")
    .eq("email", email)
    .single();


  // Jika tidak ditemukan atau password salah
  if (await password.localeCompare(data.plain_password)) {
    return res.send(`
      <div class="alert alert-danger">Invalid credentials. Please try again</a>.</div>
    `);
  }

  // Jika berhasil login, arahkan kembali ke halaman home
  res.setHeader("HX-Redirect", "/indexadmin");
  res.end();
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
