import { auth } from '@/auth';
import { ProfileModal } from './ProfileModal';

export const Profile = async () => {
  const session = await auth();

  return <ProfileModal session={session} />;
};
