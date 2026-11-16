const paragraphs = [
  "The management has repeatedly complained {1} our department’s failure {2} implement the new safety policies. How can we account {3} this? Further delays may lead {4} detrimental consequences. In fact, Mr Hobbs hinted {5} the possibility of expressing his dissatisfaction {6} our department at the next Board of Directors meeting.",
  "I have great admiration {7} her contribution {8} the improvement of the overall work conditions of our staff and her involvement {9} the team-building programs. I often wonder where her enthusiasm and her sympathy {10} each staff member stem {11}. It is paralleled {12} no other HR officer. She is intent {13} writing a proposal to the management with the aim {14} finding a solution {15} the problems we are currently facing regarding the downsizing. I believe her to be capable {16} finding a remedy {17} most of the problems we are dealing {18}.",
  "The new chief investment officer insists {19} investing {20} a chain of hotels which, in my view, are lacking even the most basic facilities. This may result {21} exceeding our annual budget. I am not questioning the said officer’s aptitude {22} his new tasks. I am merely commenting {23} his actions, which he, of course, assumes full responsibility {24}.",
  "I object {25} your treatment {26} my employees. I insist {27} an apology. Failing that, I will have to resort {28} filing an official complaint {29} your superior. Your actions have had an adverse effect {30} their emotional well-being and may pose a threat {31} their health as well. We may settle this verbally here and now or take the matter to the management. I urge you to opt {32} the first option.",
];

const keys = [
  ["about of", "Complain about oder complain of leitet den Anlass der Beschwerde ein."],
  ["to", "Auf failure folgt hier ein to-Infinitiv. Das Wort to ist hier eine Infinitivmarkierung."],
  ["for", "Account for something bedeutet, etwas zu erklären oder zu begründen."],
  ["to", "Lead to leitet die Folge ein."],
  ["at", "Hint at bezeichnet das, was jemand andeutet."],
  ["with", "Dissatisfaction with bezeichnet die Person, Gruppe oder Sache, mit der jemand unzufrieden ist."],
  ["for", "Admiration for leitet ein, wen oder was man bewundert."],
  ["to", "Contribution to nennt das Ziel, zu dem jemand beiträgt."],
  ["in", "Involvement in bezeichnet die Tätigkeit, an der jemand beteiligt ist."],
  ["for with towards toward", "Sympathy for oder towards/toward drückt Mitgefühl aus. Sympathy with kann Verbundenheit oder Verständnis ausdrücken."],
  ["from", "Stem from nennt den Ursprung. In dieser indirekten Frage steht from am Ende."],
  ["by", "Im Passiv nennt by, wer etwas erreicht oder ihm gleichkommt."],
  ["on upon", "Be intent on oder upon + -ing bedeutet, fest entschlossen zu sein, etwas zu tun."],
  ["of", "With the aim of + -ing drückt eine Absicht aus."],
  ["to for", "A solution to a problem ist die gängige Verbindung. A solution for a problem ist ebenfalls möglich und betont den Verwendungszweck."],
  ["of", "Capable of + -ing bezeichnet eine Fähigkeit."],
  ["for to", "A remedy for oder to a problem bezeichnet eine Abhilfe."],
  ["with", "Deal with bedeutet, sich mit etwas zu befassen. Im Relativsatz bleibt with am Ende."],
  ["on upon", "Insist on oder upon + -ing bedeutet, auf einer Handlung zu bestehen."],
  ["in", "Invest in nennt, worin das Geld angelegt wird."],
  ["in", "Result in leitet das Ergebnis ein."],
  ["for", "Aptitude for bezeichnet die Begabung für eine Aufgabe oder Tätigkeit."],
  ["on upon", "Comment on oder upon leitet das Thema der Bemerkung ein."],
  ["for", "Responsibility for bezeichnet das, wofür jemand verantwortlich ist."],
  ["to", "Object to leitet ein, wogegen jemand Einwände erhebt."],
  ["of", "Treatment of nennt, wer behandelt wird."],
  ["on upon", "Insist on oder upon + Nomen bezeichnet das, worauf jemand besteht."],
  ["to", "Resort to + -ing bedeutet, als Ausweg zu einer Handlung zu greifen. To ist hier eine Präposition."],
  ["with to", "File a complaint with oder to nennt die Stelle oder Person, bei der die Beschwerde eingereicht wird."],
  ["on upon", "Effect on oder upon bezeichnet, worauf sich etwas auswirkt."],
  ["to", "A threat to bezeichnet, wer oder was bedroht ist."],
  ["for", "Opt for bedeutet, sich für eine Option zu entscheiden."],
];

const exercise = document.querySelector("#exercise");
const progress = document.querySelector("#progress");
let correct = 0;
let finished = 0;

function updateProgress() {
  progress.textContent = `${correct} von ${keys.length} richtig · ${finished} abgeschlossen`;
}

function addGap(paragraph, number) {
  const [variants, rule] = keys[number - 1];
  const answers = variants.split(" ");
  const gap = document.createElement("span");
  gap.className = "gap";
  const numberLabel = document.createElement("small");
  numberLabel.textContent = number;
  numberLabel.setAttribute("aria-hidden", "true");
  const input = document.createElement("input");
  input.autocomplete = "off";
  input.spellcheck = false;
  input.setAttribute("autocapitalize", "none");
  input.setAttribute("aria-label", `Lücke ${number}`);
  const check = document.createElement("button");
  check.textContent = "✓";
  check.type = "button";
  check.disabled = true;
  check.setAttribute("aria-label", `Lücke ${number} prüfen`);
  const feedback = document.createElement("span");
  feedback.className = "feedback";
  feedback.id = `feedback-${number}`;
  feedback.setAttribute("role", "status");
  input.setAttribute("aria-describedby", feedback.id);
  let firstWrong = null;

  const value = () => input.value.trim().toLowerCase();

  function submit() {
    if (check.disabled || input.readOnly) return;
    if (answers.includes(value())) {
      correct++;
      gap.dataset.state = "correct";
      feedback.lang = "de-CH";
      feedback.textContent = firstWrong === null ? "Richtig." : `Im zweiten Versuch richtig. ${rule}`;
    } else if (firstWrong === null) {
      firstWrong = value();
      gap.dataset.state = "retry";
      feedback.textContent = `Noch nicht richtig. Zweiter Versuch. ${rule.replaceAll(new RegExp(answers.map(answer => `\\b${answer}\\b`).join("|"), "gi"), "___")}`;
      input.focus();
      input.select();
      check.disabled = true;
      return;
    } else {
      gap.dataset.state = "missed";
      feedback.textContent = `Lösung: ${answers.join(" / ")}. ${rule}`;
      input.value = answers[0];
    }
    feedback.dataset.state = gap.dataset.state;
    finished++;
    input.readOnly = true;
    check.disabled = true;
    updateProgress();
  }

  input.addEventListener("input", () => {
    check.disabled = !value() || value() === firstWrong;
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.isComposing) submit();
  });
  check.addEventListener("click", submit);
  gap.append(numberLabel, input, check);
  paragraph.append(gap, feedback);
}

function render() {
  exercise.replaceChildren();
  correct = 0;
  finished = 0;
  updateProgress();
  for (const line of paragraphs) {
    const paragraph = document.createElement("p");
    paragraph.lang = "en";
    for (const [index, part] of line.split(/\{(\d+)\}/).entries()) {
      if (index % 2) addGap(paragraph, Number(part));
      else paragraph.append(part);
    }
    exercise.append(paragraph);
  }
}

document.querySelector("#reset").addEventListener("click", () => {
  render();
  exercise.querySelector("input").focus();
});
render();
