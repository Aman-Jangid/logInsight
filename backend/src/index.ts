import app from "./server";
const PORT = parseInt(process.env.PORT || "5000", 10);
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${HOST}${HOST ? ":" : ""}${PORT}`);
});
