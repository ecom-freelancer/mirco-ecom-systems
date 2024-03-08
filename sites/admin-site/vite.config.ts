import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: /^(components|configs|types|modules|assets|helpers|hooks|pages|providers|libs)([^]*)/, // Sử dụng regex để tìm các đường dẫn bắt đầu bằng '/components/'
          replacement: '/src/$1$2', // Thay thế bằng đường dẫn tương ứng trong thư mục /src/components/
        },
      ],
    },
  });
};
