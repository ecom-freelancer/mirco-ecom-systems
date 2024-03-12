import { CategoryList } from '@/components/CategoryList';
import { Button } from 'antd';
import React, { Suspense } from 'react';

export const revalidate = 4;

function* counter(value) {
  while (true) {
    const step = yield value++;

    if (step) {
      value += step;
    }
  }
}

const generatorFunc = counter(0);

const getCategories = async (): Promise<string[]> => {
  /**
   * moack call api to get categories
   */
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('get categories');
      console.log(generatorFunc.next().value);
      resolve(['category 1', 'category 2', 'category 3']);
    }, 1000);
  });
};

const Header = async () => {
  const categories = await getCategories();
  return (
    <div>
      <div>
        <CategoryList categories={categories} />
        <Button>Hello</Button>
      </div>
    </div>
  );
};
export default function Page() {
  return (
    <Suspense fallback={'Loading...'}>
      <Header />
    </Suspense>
  );
}
