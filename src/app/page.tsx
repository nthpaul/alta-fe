import { redirect } from 'next/navigation';

export default function Home() {
  // TODO: create middleware to check if user is logged in which takes care of redirecting to login/signup page

  // if user is logged in then redirect to home
  return redirect('/shop');
}
