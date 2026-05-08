import {redirect} from 'next/navigation';

export default function HobbiesPage() {
  // Biking + podcasts content lives on the About page now; only the
  // graphic-novels detail page survives. Send /hobbies visitors there.
  redirect('/about_me');
}
