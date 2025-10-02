'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

interface NoteModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
    >
      {isLoading && <Loader message="Loading note..." />}
      {isError && (
        <ErrorMessage
          message={
            error instanceof Error ? error.message : 'Failed to load note'
          }
          onRetry={refetch}
        />
      )}
      {note && <NotePreview note={note} />}
    </Modal>
  );
}
