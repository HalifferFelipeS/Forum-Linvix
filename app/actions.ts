'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const videoUrl = formData.get('videoUrl') as string;

  // Extrair apenas o ID do vídeo do Youtube se a pessoa colar o link inteiro
  let videoId = videoUrl;
  if (videoUrl.includes('v=')) {
    videoId = videoUrl.split('v=')[1].split('&')[0];
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1];
  }

  await prisma.article.create({
    data: {
      title,
      category,
      content,
      videoId,
    },
  });

  // Atualiza o site para mostrar o post novo imediatamente
  revalidatePath('/');
}