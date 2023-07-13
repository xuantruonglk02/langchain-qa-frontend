import authRoutes from '@/modules/auth/routes';
import chatRoutes from '@/modules/chat/routes';

export const featureRoutes = [...authRoutes, ...chatRoutes];
