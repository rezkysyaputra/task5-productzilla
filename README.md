# How to use
1. git clone https://github.com/rezkysyaputra/task5-productzilla
2. npm install
3. Buat file .env sejajar dengan folder src, yang didalamnya berisikan variabel:
   - PORT=3000
   - MONGO_URI=koneksi-database-kalian
   - JWT_SECRET=sandirahasiakalian
3. Buat file .env.test sejajar dengan folder src, yang didalamnya berisikan variabel:
   - MONGO_URI_TEST=koneksi-database-kalian
4. npm run dev

# Unit testing
```bash
npm test // untuk running dua file testing sekaligus
```
```bash
npm test -- src/__test__/user.test.ts // untuk running file user 
```
```bash
npm test -- src/__test__/user.book.ts // untuk running file book 
```

# Screenshot Unit Testing
1. Running dua file sekaligus
   ![Screenshot 2024-11-04 142154](https://github.com/user-attachments/assets/1ac06517-7ef9-4290-8b6d-cb44bd1662c2)

2. Running file User
   ![Screenshot 2024-11-04 142236](https://github.com/user-attachments/assets/0d047876-9a79-4316-b746-724d4378d2a8)

3. Runninf file Book
   ![Screenshot 2024-11-04 142324](https://github.com/user-attachments/assets/6329b579-bfb9-40c9-9c7d-e7fe2f735dfb)


