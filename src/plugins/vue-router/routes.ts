import authRoutes from '@/modules/auth/routes';
import chatRoutes from '@/modules/chat/routes';
import documentRoutes from '@/modules/document/routes';
import topicRoutes from '@/modules/topic/routes';

export const featureRoutes = [
    ...authRoutes,
    ...chatRoutes,
    ...documentRoutes,
    ...topicRoutes,
];
