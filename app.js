
// تنظيف السؤال
function clean(s) {
  return s.toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[؟?!.,،]/g, "")
    .trim();
}

// قاعدة المعرفة
const knowledge = [
  {
    keys: ["مرحبا", "اهلا", "السلام عليكم", "صباح الخير"],
    answer: "أهلاً بك! كيف يمكنني مساعدتك؟"
  },
  {
    keys: ["كيف حالك", "كيفك"],
    answer: "أنا بخير! شكراً لسؤالك. وأنت؟"
  },
  {
    keys: ["اسمك", "من انت"],
    answer: "أنا My AI، مساعدك الذكي."
  },
  {
    keys: ["ماينكرافت", "minecraft"],
    answer: "Minecraft لعبة عالم مفتوح تسمح لك بالبناء والاستكشاف والقتال وصناعة الأدوات."
  },
  {
    keys: ["تونس", "عاصمة تونس"],
    answer: "عاصمة تونس هي مدينة تونس."
  },
  {
    keys: ["فرنسا", "عاصمة فرنسا"],
    answer: "عاصمة فرنسا هي باريس."
  },
  {
    keys: ["مصر", "عاصمة مصر"],
    answer: "عاصمة مصر هي القاهرة."
  },
  {
    keys: ["الارض", "كوكبنا"],
    answer: "الأرض هو الكوكب الذي نعيش عليه، وهو الكوكب الثالث من الشمس."
  },
  {
    keys: ["الشمس"],
    answer: "الشمس نجم يقع في مركز المجموعة الشمسية."
  },
  {
    keys: ["القمر"],
    answer: "القمر هو القمر الطبيعي للأرض."
  },
  {
    keys: ["الانترنت"],
    answer: "الإنترنت شبكة عالمية تربط الأجهزة وتسمح بتبادل المعلومات."
  },
  {
    keys: ["الذكاء الاصطناعي"],
    answer: "الذكاء الاصطناعي هو تقنية تجعل البرامج تنفذ مهاماً تحتاج عادةً إلى ذكاء بشري."
  },
  {
    keys: ["البرمجة"],
    answer: "البرمجة هي كتابة تعليمات للحاسوب باستخدام لغات مثل JavaScript وPython."
  },
  {
    keys: ["html"],
    answer: "HTML لغة تستخدم لبناء هيكل صفحات الويب."
  },
  {
    keys: ["css"],
    answer: "CSS لغة تستخدم لتصميم المواقع وتغيير ألوانها وأحجامها."
  },
  {
    keys: ["javascript", "جافاسكريبت"],
    answer: "JavaScript لغة برمجة تجعل المواقع تفاعلية وذكية."
  },
  {
    keys: ["بايثون", "python"],
    answer: "Python لغة برمجة سهلة نسبياً وتستخدم في الذكاء الاصطناعي وتطوير البرامج."
  },
  {
    keys: ["اكبر محيط"],
    answer: "المحيط الهادئ هو أكبر محيط في العالم."
  },
  {
    keys: ["عدد الكواكب"],
    answer: "يوجد 8 كواكب في المجموعة الشمسية."
  },
  {
    keys: ["الجاذبية"],
    answer: "الجاذبية قوة تجذب الأجسام بعضها نحو بعض."
  },
  {
    keys: ["الماء"],
    answer: "الماء يتكون من ذرتي هيدروجين وذرة أكسجين، وصيغته H2O."
  },
  {
    keys: ["شكرا", "شكرا لك"],
    answer: "العفو! أنا هنا لمساعدتك."
  },
  {
    keys: ["وداعا", "باي"],
    answer: "إلى اللقاء! أتمنى لك يوماً رائعاً."
  },
  {
    keys: ["الوقت", "الساعة"],
    answer: "الوقت الآن: " + new Date().toLocaleTimeString("ar")
  },
  {
    keys: ["التاريخ", "اليوم"],
    answer: "تاريخ اليوم: " + new Date().toLocaleDateString("ar")
  }
];

// حساب العمليات الرياضية البسيطة دون eval
function calculate(s) {
  s = s.replace(/^(احسب|كم يساوي|ما ناتج)/, "").trim();

  if (!/^[\d+\-*/().\s]+$/.test(s)) return null;

  let tokens = s.match(/\d+(?:\.\d+)?|[+\-*/()]|./g);
  if (!tokens) return null;

  let i = 0;

  function expression() {
    let n = term();
    while (tokens[i] === "+" || tokens[i] === "-") {
      let op = tokens[i++];
      let b = term();
      n = op === "+" ? n + b : n - b;
    }
    return n;
  }

  function term() {
    let n = factor();
    while (tokens[i] === "*" || tokens[i] === "/") {
      let op = tokens[i++];
      let b = factor();
      if (op === "/" && b === 0) throw Error();
      n = op === "*" ? n * b : n / b;
    }
    return n;
  }

  function factor() {
    if (tokens[i] === "-") {
      i++;
      return -factor();
    }
    if (tokens[i] === "(") {
      i++;
      let n = expression();
      if (tokens[i++] !== ")") throw Error();
      return n;
    }
    let n = Number(tokens[i++]);
    if (!Number.isFinite(n)) throw Error();
    return n;
  }

  try {
    let result = expression();
    if (i !== tokens.length || !Number.isFinite(result)) return null;
    return String(result);
  } catch {
    return null;
  }
}

// الرد على الأسئلة
function think(question) {
  let q = clean(question);

  let math = calculate(q);
  if (math !== null) return "النتيجة هي: " + math;

  for (let item of knowledge) {
    if (item.keys.some(k => q.includes(clean(k)))) {
      return item.answer;
    }
  }

  if (q.includes("اسم")) {
    return "يمكنك مناداتي My AI!";
  }

  if (q.includes("لماذا")) {
    return "سؤال جميل! حاول أن توضح لي الموضوع أكثر حتى أساعدك.";
  }

  return "لم أفهم سؤالك بعد. حاول إعادة صياغته بطريقة أخرى.";
}

// إرسال الرسائل
const input = document.getElementById("q");
const messages = document.getElementById("messages");

function addMessage(who, text) {
  let p = document.createElement("p");
  p.textContent = who + ": " + text;
  messages.appendChild(p);
}

function send() {
  let question = input.value.trim();
  if (!question) return;

  addMessage("أنت", question);
  addMessage("My AI", think(question));

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

document.getElementById("send").onclick = send;

input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});
