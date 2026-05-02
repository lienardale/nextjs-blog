import {getTranslations} from 'next-intl/server';
import DetailPage from '../../components/DetailPage';

const content = {
  en: {
    title: '42 Paris',
    summary: <p>Software engineering school with peer-to-peer learning, project-based pedagogy, and no traditional teachers or courses. 3 years of coding, algorithms, and system programming.</p>,
    body: (
      <>
        <p>For 3 years, I studied software engineering, software development, software architecture, all in one word: coding.</p>
        <p className="mt-4"><a href="https://42.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">42</a> is a future-proof computer science training to educate the next generation of software engineers. The 42 program takes a project-based approach to progress and is designed to develop technical and people skills that match the expectations of the labor market.</p>
        <p className="mt-4"><strong>NO COURSES. NO TEACHERS. NO CLASSES.</strong></p>
        <p>Thanks to its innovative teaching methods, 42 is able to offer training par excellence without resorting to lectures. The pedagogical staff is available to help the students find their own solutions. In order to progress at 42, you have to work in groups, lean with the community to overcome challenges and then, share your experience with your peers. You don&apos;t learn programming by copying algorithms on paper!</p>
        <p className="mt-4"><strong>PROJECT-BASED PEDAGOGY</strong></p>
        <p>At 42, students act for their own success within a 100% practical curriculum. Surpassing oneself is the only way to move forward: You can always count on the strength of the group; give and share information, as well as learn and train at the same time. This growing collective intelligence helps students understand how a professional environment works. Each part must rely on the other in order to properly achieve a project.</p>
        <p className="mt-4"><strong>FAILING IS PROGRESSING</strong></p>
        <p>At 42, failing is not the end. It is AN end. It&apos;s the path to success: test a program, understand your mistakes, correct them and move forward. At 42, you are rewarded for finding your own solutions. This is not about mindlessly copying a model. Achievement is the only thing that matters, whichever path you use to reach it.</p>
        <p className="mt-4"><strong>PEER-TO-PEER LEARNING</strong></p>
        <p>If you apply to 42, don&apos;t expect a &ldquo;knowledgeable&rdquo; person to teach you anything. You have to find the answers by yourself or ask fellow students to show you and explain things that you in turn will learn and transmit to someone else. This method allows you to move forward and sharpen your skills through research, experimentation and defending your personal approach to a given problem.</p>
        <p className="mt-4"><strong>PEER-TO-PEER EVALUATION</strong></p>
        <p>In classical learning, evaluation happens at the end of the curriculum. At 42, this is when you learn the most. Peer evaluation requires students to evaluate each other&apos;s work with the help of a grading scale established by the pedagogical staff. This system supports dialogue and allows sharing advice that will help students move forward and seek alternative methods. There is never one specific answer at 42. There is not one single model you must reproduce and learn by heart.</p>
        <p className="mt-4"><strong>GROUP WORK IS NOT CHEATING</strong></p>
        <p>In a classroom, it&apos;s usually ill-advised to join forces or share advice in order to solve a problem. At 42, it&apos;s the other way around. When projects get too tough to tackle, creating a group helps share different points of view. By approaching someone struggling with the same problem, you can share your thoughts and perspectives. Everyone brings something so that, together, you can understand and remember the keys to achieving a project.</p>
      </>
    ),
  },
  fr: {
    title: '42 Paris',
    summary: <p>École d&apos;ingénierie logicielle avec apprentissage entre pairs, pédagogie par projet, sans professeurs ni cours traditionnels. 3 ans de code, d&apos;algorithmes et de programmation système.</p>,
    body: (
      <>
        <p>Pendant 3 ans, j&apos;ai étudié le génie logiciel, le développement logiciel, l&apos;architecture logicielle, le tout en un mot : coder.</p>
        <p className="mt-4"><a href="https://42.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">42</a> est une formation en informatique tournée vers l&apos;avenir, destinée à former la prochaine génération d&apos;ingénieurs en logiciel. Le programme 42 adopte une approche de progression par projet et est conçu pour développer des compétences techniques et humaines qui correspondent aux attentes du marché du travail.</p>
        <p className="mt-4"><strong>PAS DE COURS. PAS DE PROFESSEURS. PAS DE CLASSE.</strong></p>
        <p>Grâce à ses méthodes pédagogiques innovantes, 42 est en mesure d&apos;offrir une formation d&apos;excellence sans recourir aux cours magistraux. L&apos;équipe pédagogique est disponible pour aider les étudiants à trouver leurs propres solutions. Pour progresser à 42, il faut travailler en groupe, s&apos;appuyer sur la communauté pour surmonter les difficultés et ensuite, partager son expérience avec ses pairs. On n&apos;apprend pas la programmation en copiant des algorithmes sur papier !</p>
        <p className="mt-4"><strong>PÉDAGOGIE PAR PROJET</strong></p>
        <p>Chez 42, les étudiants agissent pour leur propre réussite dans le cadre d&apos;un cursus 100% pratique. Le dépassement de soi est le seul moyen d&apos;avancer : On peut toujours compter sur la force du groupe, donner et partager des informations, mais aussi apprendre et se former en même temps. Cette intelligence collective croissante aide les étudiants à comprendre le fonctionnement d&apos;un environnement professionnel. Chaque partie doit s&apos;appuyer sur l&apos;autre afin de réaliser correctement un projet.</p>
        <p className="mt-4"><strong>ÉCHOUER, C&apos;EST PROGRESSER</strong></p>
        <p>À 42, l&apos;échec n&apos;est pas une fin. C&apos;est UNE fin. C&apos;est le chemin du succès : tester un programme, comprendre ses erreurs, les corriger et aller de l&apos;avant. À 42, vous êtes récompensé pour avoir trouvé vos propres solutions. Il ne s&apos;agit pas de copier sans réfléchir un modèle. La réussite est la seule chose qui compte, quel que soit le chemin que vous empruntez pour l&apos;atteindre.</p>
        <p className="mt-4"><strong>APPRENTISSAGE ENTRE PAIRS</strong></p>
        <p>Si vous postulez à 42, ne vous attendez pas à ce qu&apos;une personne &laquo;bien informée&raquo; vous enseigne quoi que ce soit. Vous devez trouver les réponses par vous-même ou demander à vos camarades de vous montrer et d&apos;expliquer des choses que vous apprendrez et transmettrez à votre tour à quelqu&apos;un d&apos;autre. Cette méthode vous permet d&apos;avancer et d&apos;affiner vos compétences par la recherche, l&apos;expérimentation et la défense de votre approche personnelle d&apos;un problème donné.</p>
        <p className="mt-4"><strong>ÉVALUATION ENTRE PAIRS</strong></p>
        <p>Dans l&apos;apprentissage classique, l&apos;évaluation intervient à la fin du cursus. À 42, c&apos;est là que l&apos;on apprend le plus. L&apos;évaluation par les pairs demande aux étudiants d&apos;évaluer le travail des autres à l&apos;aide d&apos;une échelle de notation établie par l&apos;équipe pédagogique. Ce système favorise le dialogue et permet de partager des conseils qui aideront les étudiants à progresser et à rechercher des méthodes alternatives. Il n&apos;y a jamais une réponse spécifique à 42. Il n&apos;y a pas un seul modèle à reproduire et à apprendre par c&oelig;ur.</p>
        <p className="mt-4"><strong>LE TRAVAIL EN GROUPE N&apos;EST PAS DE LA TRICHE</strong></p>
        <p>Dans une classe, il est généralement malvenu d&apos;unir ses forces ou de partager ses conseils pour résoudre un problème. À 42, c&apos;est l&apos;inverse. Lorsque les projets deviennent trop difficiles à aborder, créer un groupe permet de partager différents points de vue. En approchant une personne aux prises avec le même problème, vous pouvez partager vos réflexions et vos perspectives. Chacun apporte quelque chose pour qu&apos;ensemble, on puisse comprendre et retenir les clés de la réalisation d&apos;un projet.</p>
      </>
    ),
  },
  de: {
    title: '42 Paris',
    summary: <p>Softwaretechnik-Schule mit Peer-to-Peer-Lernen, projektbasierter Pädagogik und ohne traditionelle Lehrer oder Kurse. 3 Jahre Codierung, Algorithmen und Systemprogrammierung.</p>,
    body: (
      <>
        <p>3 Jahre lang habe ich Software-Engineering, Software-Entwicklung und Software-Architektur studiert, alles in einem Wort: Codierung.</p>
        <p className="mt-4"><a href="https://42.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">42</a> ist eine zukunftssichere Informatikausbildung, die die nächste Generation von Softwareingenieuren ausbildet. Das 42-Programm verfolgt einen projektbasierten Ansatz, um Fortschritte zu erzielen, und ist darauf ausgerichtet, technische und menschliche Fähigkeiten zu entwickeln, die den Erwartungen des Arbeitsmarktes entsprechen.</p>
        <p className="mt-4"><strong>KEINE KURSE. KEINE LEHRER. KEINE KLASSEN.</strong></p>
        <p>Dank seiner innovativen Lehrmethoden ist 42 in der Lage, eine Ausbildung par excellence anzubieten, ohne auf Vorlesungen zurückgreifen zu müssen. Das pädagogische Personal steht zur Verfügung, um den Studenten zu helfen, ihre eigenen Lösungen zu finden. Um bei 42 voranzukommen, muss man in Gruppen arbeiten, sich mit der Gemeinschaft abstimmen, um Herausforderungen zu meistern, und dann seine Erfahrungen mit Gleichaltrigen teilen. Programmieren lernt man nicht durch das Kopieren von Algorithmen auf Papier!</p>
        <p className="mt-4"><strong>PROJEKTBASIERTE PÄDAGOGIK</strong></p>
        <p>Bei 42 handeln die Studenten für ihren eigenen Erfolg im Rahmen eines 100 % praktischen Lehrplans. Über sich selbst hinauszuwachsen ist der einzige Weg, um voranzukommen: Man kann sich immer auf die Stärke der Gruppe verlassen, Informationen weitergeben und austauschen sowie gleichzeitig lernen und trainieren. Diese wachsende kollektive Intelligenz hilft den Schülern zu verstehen, wie ein professionelles Umfeld funktioniert. Jeder Teil muss sich auf den anderen verlassen können, um ein Projekt zu verwirklichen.</p>
        <p className="mt-4"><strong>SCHEITERN IST EIN FORTSCHRITT</strong></p>
        <p>Bei 42 ist das Scheitern nicht das Ende. Es ist EIN Ende. Es ist der Weg zum Erfolg: Testen Sie ein Programm, erkennen Sie Ihre Fehler, korrigieren Sie sie und machen Sie weiter. Mit 42 werden Sie dafür belohnt, dass Sie Ihre eigenen Lösungen finden. Hier geht es nicht darum, gedankenlos ein Modell zu kopieren. Der Erfolg ist das Einzige, was zählt, egal auf welchem Weg Sie ihn erreichen.</p>
        <p className="mt-4"><strong>PEER-TO-PEER-LERNEN</strong></p>
        <p>Wenn Sie sich bei 42 bewerben, erwarten Sie nicht, dass eine &bdquo;sachkundige&ldquo; Person Ihnen etwas beibringt. Sie müssen die Antworten selbst finden oder Mitschüler bitten, Ihnen Dinge zu zeigen und zu erklären, die Sie dann wiederum lernen und an andere weitergeben können. Diese Methode ermöglicht es Ihnen, sich weiterzuentwickeln und Ihre Fähigkeiten durch Nachforschungen, Experimente und die Verteidigung Ihres persönlichen Ansatzes für ein bestimmtes Problem zu verbessern.</p>
        <p className="mt-4"><strong>PEER-TO-PEER-BEWERTUNG</strong></p>
        <p>Beim klassischen Lernen erfolgt die Bewertung am Ende des Lehrplans. Bei 42 lernt man zu diesem Zeitpunkt am meisten. Bei der Peer-Evaluierung bewerten die Schüler die Arbeit der anderen mit Hilfe einer vom pädagogischen Personal erstellten Notenskala. Dieses System fördert den Dialog und ermöglicht den Austausch von Ratschlägen, die den Schülern helfen, weiterzukommen und alternative Methoden zu finden. Bei 42 gibt es nie nur eine bestimmte Antwort. Es gibt nicht nur ein einziges Modell, das man reproduzieren und auswendig lernen muss.</p>
        <p className="mt-4"><strong>GRUPPENARBEIT IST KEIN SCHUMMELN</strong></p>
        <p>In einem Klassenzimmer ist es in der Regel nicht ratsam, sich zusammenzutun oder Ratschläge zu teilen, um ein Problem zu lösen. Bei 42 ist es genau andersherum. Wenn sich ein Projekt als zu schwierig erweist, hilft es, eine Gruppe zu bilden, um verschiedene Standpunkte zu teilen. Indem man sich an jemanden wendet, der mit demselben Problem zu kämpfen hat, kann man seine Gedanken und Perspektiven austauschen. Jeder bringt etwas mit, so dass man gemeinsam die Schlüssel zum Gelingen eines Projekts verstehen und sich daran erinnern kann.</p>
      </>
    ),
  },
  es: {
    title: '42 Paris',
    summary: <p>Escuela de ingeniería de software con aprendizaje entre pares, pedagogía basada en proyectos y sin profesores ni cursos tradicionales. 3 años de codificación, algoritmos y programación de sistemas.</p>,
    body: (
      <>
        <p>Durante 3 años, estudié ingeniería de software, desarrollo de software, arquitectura de software, todo en una palabra: codificación.</p>
        <p className="mt-4"><a href="https://42.fr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">42</a> es una formación en ciencias de la computación preparada para el futuro con el fin de educar a la próxima generación de ingenieros de software. El programa 42 adopta un enfoque de progreso basado en proyectos y está diseñado para desarrollar habilidades técnicas y humanas que coincidan con las expectativas del mercado laboral.</p>
        <p className="mt-4"><strong>NO HAY CURSOS. SIN PROFESORES. SIN CLASES.</strong></p>
        <p>Gracias a sus innovadores métodos de enseñanza, 42 es capaz de ofrecer la formación por excelencia sin recurrir a las clases magistrales. El personal pedagógico está disponible para ayudar a los alumnos a encontrar sus propias soluciones. Para progresar en 42, hay que trabajar en grupo, apoyarse en la comunidad para superar los retos y luego, compartir la experiencia con los compañeros. No se aprende a programar copiando algoritmos en papel.</p>
        <p className="mt-4"><strong>PEDAGOGÍA BASADA EN PROYECTOS</strong></p>
        <p>En 42, los estudiantes actúan para su propio éxito dentro de un plan de estudios 100% práctico. Superarse a sí mismo es la única manera de avanzar: Siempre se puede contar con la fuerza del grupo; dar y compartir información, así como aprender y formarse al mismo tiempo. Esta creciente inteligencia colectiva ayuda a los alumnos a comprender cómo funciona un entorno profesional. Cada parte debe apoyarse en la otra para realizar correctamente un proyecto.</p>
        <p className="mt-4"><strong>FRACASAR ES PROGRESAR</strong></p>
        <p>A los 42 años, fracasar no es el fin. Es un fin. Es el camino hacia el éxito: probar un programa, comprender sus errores, corregirlos y avanzar. A los 42 años, se te recompensa por encontrar tus propias soluciones. No se trata de copiar un modelo sin sentido. El éxito es lo único que importa, sea cual sea el camino que utilices para alcanzarlo.</p>
        <p className="mt-4"><strong>APRENDIZAJE ENTRE IGUALES</strong></p>
        <p>Si te presentas a los 42, no esperes que un &ldquo;entendido&rdquo; te enseñe nada. Tienes que encontrar las respuestas por ti mismo o pedir a tus compañeros que te muestren y expliquen cosas que tú a su vez aprenderás y transmitirás a otra persona. Este método te permite avanzar y perfeccionar tus habilidades mediante la investigación, la experimentación y la defensa de tu enfoque personal ante un problema determinado.</p>
        <p className="mt-4"><strong>EVALUACIÓN DE IGUAL A IGUAL</strong></p>
        <p>En el aprendizaje clásico, la evaluación tiene lugar al final del plan de estudios. En 42, es cuando más se aprende. La evaluación entre pares requiere que los estudiantes evalúen el trabajo de los demás con la ayuda de una escala de calificaciones establecida por el personal pedagógico. Este sistema favorece el diálogo y permite compartir consejos que ayuden a los estudiantes a avanzar y buscar métodos alternativos. Nunca hay una respuesta específica a los 42 años. No hay un único modelo que deban reproducir y aprender de memoria.</p>
        <p className="mt-4"><strong>EL TRABAJO EN GRUPO NO ES UNA TRAMPA</strong></p>
        <p>En una clase, suele ser desaconsejable unir fuerzas o compartir consejos para resolver un problema. En 42, es al revés. Cuando los proyectos son demasiado difíciles de abordar, crear un grupo ayuda a compartir diferentes puntos de vista. Al acercarse a alguien que está luchando con el mismo problema, puede compartir sus pensamientos y perspectivas. Todo el mundo aporta algo para que, juntos, podáis entender y recordar las claves para conseguir un proyecto.</p>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function FortyTwoParisPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;

  const tr = await getTranslations({locale});
  return (
    <DetailPage
      section="education"
      sectionLabel={tr('nav.education')}
      indexLabel={tr('nav.index')}
      eyebrow="// 2019 → 2022 · Paris"
      title={`${t.title}<em>.</em>`}
      meta="01 / Education"
      summary={t.summary}
      body={t.body}
      footerLabel="01 / Education"
    />
  );
}
