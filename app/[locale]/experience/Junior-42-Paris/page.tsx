import {getTranslations} from 'next-intl/server';
import DetailPage from '../../components/DetailPage';

const content = {
  en: {
    title: 'Junior 42 Paris',
    summary: <p>Junior company created in 2019 — Business Manager managing a team of 12 Project Leaders and 4 Technical Experts during the Client Qualification phase.</p>,
    body: (
      <>
        <p><a href="https://junior42.com/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Junior 42 Paris</a> is a junior company created in 2019. A junior company is both a company and a non-profit. This special status enables students to perform missions for clients, and get another sense of the professional world.</p>
        <p className="mt-4"><strong>Business Manager:</strong> my role was to form, help, and manage a team of 12 Project Leaders and 4 Technical Experts, during the first phase of interactions with the clients, a phase we called <strong>Client Qualification</strong>.</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>My work on this post has been to standardize and optimize all the processes around it, so we could achieve both vertical and horizontal scaling. I&apos;m glad to say it was a success since we went from 44 prospects to 87 in one year and maintained our conversion rate.</li>
          <li><strong>Recruitment and training:</strong> it was also my responsibility to recruit and train the Project Leaders, and also to participate in this phase for the developers &amp; technical experts. 32 people were recruited and trained from scratch regarding digital project management in one year and a half.</li>
        </ul>
      </>
    ),
  },
  fr: {
    title: 'Junior 42 Paris',
    summary: <p>Junior entreprise créée en 2019 — Business Manager gérant une équipe de 12 chefs de projets et 4 experts techniques lors de la phase de qualification client.</p>,
    body: (
      <>
        <p><a href="https://junior42.com/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Junior 42 Paris</a> est une junior entreprise créée en 2019. Une junior entreprise est à la fois une entreprise et une association à but non lucratif. Ce statut particulier permet aux étudiants de réaliser des missions pour des clients, et de se faire une autre idée du monde professionnel.</p>
        <p className="mt-4"><strong>Business Manager :</strong> mon rôle était de former, d&apos;aider et de gérer une équipe de 12 chefs de projets et 4 experts techniques, lors de la première phase d&apos;interactions avec les clients, phase que nous avons appelée <strong>Client Qualification</strong>.</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Mon travail sur ce poste a consisté à normaliser et à optimiser tous les processus qui l&apos;entourent, afin que nous puissions réaliser une mise à l&apos;échelle verticale et horizontale. Je suis heureux de dire que cela a été un succès puisque nous sommes passés de 44 prospects à 87 en un an et que nous avons maintenu notre taux de conversion.</li>
          <li><strong>Recrutement et formation :</strong> il était également de ma responsabilité de recruter et de former les chefs de projet, ainsi que de participer à cette phase pour les développeurs et les experts techniques. 32 personnes ont été recrutées et formées à la gestion de projets numériques en un an et demi.</li>
        </ul>
      </>
    ),
  },
  de: {
    title: 'Junior 42 Paris',
    summary: <p>2019 gegründete Juniorfirma — Business Manager eines Teams von 12 Projektleitern und 4 technischen Experten in der Phase der Kundenqualifizierung.</p>,
    body: (
      <>
        <p><a href="https://junior42.com/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Junior 42 Paris</a> ist eine im Jahr 2019 gegründete Juniorfirma. Eine Juniorfirma ist sowohl ein Unternehmen als auch eine gemeinnützige Einrichtung. Dieser besondere Status ermöglicht es Studenten, Aufträge für Kunden auszuführen und einen anderen Einblick in die Berufswelt zu bekommen.</p>
        <p className="mt-4"><strong>Business Manager:</strong> Meine Aufgabe war es, ein Team von 12 Projektleitern und 4 technischen Experten zu bilden, zu unterstützen und zu leiten, und zwar in der ersten Phase der Interaktion mit den Kunden, die wir <strong>Client Qualification</strong> nennen.</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Meine Arbeit in diesem Bereich bestand darin, alle Prozesse zu standardisieren und zu optimieren, damit wir sowohl eine vertikale als auch eine horizontale Skalierung erreichen konnten. Ich freue mich, sagen zu können, dass es ein Erfolg war, da wir innerhalb eines Jahres von 44 auf 87 potenzielle Kunden gestiegen sind und unsere Konversionsrate beibehalten haben.</li>
          <li><strong>Rekrutierung und Schulung:</strong> Es war auch meine Aufgabe, die Projektleiter zu rekrutieren und zu schulen und in dieser Phase auch an der Schulung der Entwickler und technischen Experten teilzunehmen. In anderthalb Jahren wurden 32 Personen rekrutiert und von Grund auf im digitalen Projektmanagement geschult.</li>
        </ul>
      </>
    ),
  },
  es: {
    title: 'Junior 42 Paris',
    summary: <p>Empresa junior creada en 2019 — Gerente de negocio gestionando un equipo de 12 líderes de proyecto y 4 expertos técnicos durante la fase de calificación del cliente.</p>,
    body: (
      <>
        <p><a href="https://junior42.com/" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Junior 42 Paris</a> es una empresa junior creada en 2019. Una empresa junior es a la vez una empresa y una organización sin ánimo de lucro. Este estatus especial permite a los estudiantes realizar misiones para los clientes, y obtener otro sentido del mundo profesional.</p>
        <p className="mt-4"><strong>Gerente de negocio:</strong> mi papel era formar, ayudar y gestionar un equipo de 12 líderes de proyecto y 4 expertos técnicos, durante la primera fase de las interacciones con los clientes, una fase que llamamos <strong>Calificación del cliente</strong>.</p>
        <ul className="list-disc pl-6 my-2 space-y-1">
          <li>Mi trabajo en este puesto ha consistido en estandarizar y optimizar todos los procesos en torno a él, de modo que pudiéramos conseguir un escalado tanto vertical como horizontal. Me alegra decir que fue un éxito ya que pasamos de 44 prospectos a 87 en un año y mantuvimos nuestra tasa de conversión.</li>
          <li><strong>Contratación y formación:</strong> también era mi responsabilidad contratar y formar a los jefes de proyecto, así como participar en esta fase para los desarrolladores y expertos técnicos. En un año y medio se contrató y formó a 32 personas desde cero en materia de gestión de proyectos digitales.</li>
        </ul>
      </>
    ),
  },
} as const;

type Locale = keyof typeof content;

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  return {title: content[locale as Locale]?.title ?? content.en.title};
}

export default async function Junior42Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = content[locale as Locale] ?? content.en;
  const tr = await getTranslations({locale});

  return (
    <DetailPage
      section="experience"
      sectionLabel={tr('nav.experience')}
      indexLabel={tr('nav.index')}
      eyebrow="// 2020 → 2022 · Paris"
      title={`${t.title}<em>.</em>`}
      meta="02 / Experience"
      summary={t.summary}
      body={t.body}
      footerLabel="02 / Experience"
    />
  );
}
