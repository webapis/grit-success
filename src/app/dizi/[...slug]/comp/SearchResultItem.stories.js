import SearchResultItem from "./SearchResultItem";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'SearchResultItem',
  component: SearchResultItem,

};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};

