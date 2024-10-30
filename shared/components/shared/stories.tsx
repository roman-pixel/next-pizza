'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReactStories from 'react-insta-stories';

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
					onClick={() => onClickStory(story)}
				/>
			))}

			{open && (
				<div className='absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-black/80'>
					<div className='relative w-[520px]'>
						<button
							className='absolute -right-10 -top-5 z-30'
							onClick={() => setOpen(false)}
						>
							<X className='absolute top-0 h-8 w-8 text-white/50 ring-0' />
						</button>

						<ReactStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={
								selectedStory?.items.map(item => ({ url: item.sourceUrl })) ||
								[]
							}
							defaultInterval={3000}
							width={520}
							height={800}
						/>
					</div>
				</div>
			)}
		</Container>
	);
};
