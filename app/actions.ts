'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// CRIAR
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const videoUrl = formData.get('videoUrl') as string;

  let videoId = videoUrl;
  if (videoUrl.includes('v=')) {
    videoId = videoUrl.split('v=')[1].split('&')[0];
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1];
  }

  await prisma.article.create({
    data: { title, category, content, videoId },
  });

  revalidatePath('/admin'); // Atualiza a lista do admin
  revalidatePath('/');      // Atualiza o site
}

// EDITAR (NOVO)
export async function updatePost(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;
  const videoUrl = formData.get('videoUrl') as string;

  let videoId = videoUrl;
  if (videoUrl.includes('v=')) {
    videoId = videoUrl.split('v=')[1].split('&')[0];
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1];
  }

  await prisma.article.update({
    where: { id },
    data: { title, category, content, videoId },
  });

  revalidatePath('/admin');
  revalidatePath('/');
}

// DELETAR (NOVO)
export async function deletePost(id: string) {
  await prisma.article.delete({
    where: { id },
  });
  
  revalidatePath('/admin');
  revalidatePath('/');
}