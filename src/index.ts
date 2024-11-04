import { web } from './app/web';

const PORT = process.env.PORT || 3000;
web.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
