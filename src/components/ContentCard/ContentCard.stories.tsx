import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ContentCard, ContentCardProps,CardGrid } from '../..';

const meta: Meta = {
  title: 'ContentCard',
  component: ContentCard,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },

  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ContentCardProps> = args => <ContentCard {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const DefaultContentCard = Template.bind({});

export const MyFirstContentCard = ()=>{
  return <ContentCard header='hello' footer='world'>Content</ContentCard>
}

export const CardGridStory = () => {
  return <CardGrid cards={[{ header: 'hello', footer: 'world', content: 'Content' }]} />;
}

DefaultContentCard.args = {};
