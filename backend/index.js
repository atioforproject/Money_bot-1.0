import "dotenv/config";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => ctx.reply("Halo! Kirim pesan apa saja"));

bot.command("help", (ctx) =>
  ctx.reply(`Cara pakai:
- pengeluaran: Beli bensin 20rb
- pemasukan: gaji 5jt`),
);

// perintah yang tidak di kenal
bot.on("message:entities:bot_command", (ctx) =>
  ctx.reply("Perintah itu tidak ada, ketik /help untuk melihat cara pakai"),
);

// handler photo
bot.on("message:photo", (ctx) => ctx.reply("Aku menerima fotomu!"));

// handler teks biasa
bot.on("message:text", (ctx) => {
  const teks = ctx.message.text;
  const isAngka = /\d/.test(teks);

  if (!isAngka) {
    return ctx.reply(
      "Aku tidak mengerti maksudmu, ketik /help untuk melihat cara pakai",
    );
  }

  ctx.reply("Oke aku baca: " + teks);
});

// handler teks lain
bot.on("message", (ctx) =>
  ctx.reply("Aku baru bisa membaca teks. Ketik /help untuk melihat cara pakai"),
);

bot.catch((err) => console.error("Error: ", err.message));

bot.start({ onStart: (me) => console.log(`Bot @${me.username} berjalan`) });
