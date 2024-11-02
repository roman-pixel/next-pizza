'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReactInstaStories from 'react-insta-stories';

import { Skeleton } from '../ui';
import { Container } from './container';

import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';

interface Props {
	className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = useState<IStory[]>([]);
	const [open, setOpen] = useState(false);
	const [selectedStory, setSelectedStory] = useState<IStory | null>(null);
	const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

	useEffect(() => {
		async function fetchStories() {
			try {
				const stories = await Api.stories.getAll();
				setStories(stories);
			} catch (err) {
				console.error(err);
			}
		}

		fetchStories();
	}, []);

	useEffect(() => {
		if (open) {
			document.body.classList.add('overflow-hidden'); // Отключаем скролл
		} else {
			document.body.classList.remove('overflow-hidden'); // Включаем скролл
		}
	}, [open]);

	useEffect(() => {
		const handleKeyDown = (event: { key: string }) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setOpen]);

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<Container
			className={cn('my-10 flex items-center justify-between gap-2', className)}
		>
			{stories.length === 0 &&
				[...Array(6)].map((_, index) => (
					<Skeleton
						key={index}
						className='h-[200px] w-[250px]'
					/>
				))}

			{stories.map(story => (
				<Image
					key={story.id}
					src={story.previewImageUrl}
					alt={`story preview image #${story.id}`}
					className='cursor-pointer rounded-md'
					width={250}
					height={200}
					priority
					style={{ width: 'auto', height: 'auto' }}
					onClick={() => onClickStory(story)}
				/>
			))}

			{open && (
				<div
					className='fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/80'
					onClick={() => setOpen(false)}
				>
					{/* Фоновая картинка с размытием */}
					{selectedStory?.items[currentStoryIndex]?.sourceUrl && (
						<>
							<div
								className='absolute inset-0 -z-10 bg-cover bg-center blur-2xl'
								style={{
									backgroundImage: `url(${selectedStory?.items[currentStoryIndex]?.sourceUrl})`
								}}
							/>

							<div className='absolute inset-0 bg-black opacity-40' />
						</>
					)}

					{/* Основной контент поверх фона */}
					<div className='relative w-[520px] rounded'>
						<button
							className='absolute -right-10 -top-2 z-30'
							onClick={() => setOpen(false)}
						>
							<X className='absolute top-0 h-8 w-8 text-white/50 ring-0' />
						</button>

						<ReactInstaStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={
								selectedStory?.items.map(item => ({ url: item.sourceUrl })) ||
								[]
							}
							onStoryStart={(storyCount: number) =>
								setCurrentStoryIndex(storyCount)
							}
							defaultInterval={5000}
							keyboardNavigation
							width={525}
							height={810}
							storyContainerStyles={{
								background: 'none'
							}}
							storyStyles={{
								borderRadius: '15px'
							}}
						/>
					</div>
				</div>
			)}
		</Container>
	);
};
