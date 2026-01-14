import { prisma } from '../../lib/prisma';
import AdminPanel from './AdminPanel';

// Esta página agora é "Server Side" (Roda no servidor para buscar dados)
// Ela busca os dados e passa para o componente "AdminPanel" que cuida da tela
export default async function AdminPage() {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <AdminPanel articles={articles} />;
}