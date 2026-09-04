# CardMemo — Kelime Kartı

CardMemo, yabancı kelimeleri Türkçe karşılıklarıyla cihazda saklayan ve karıştırılmış kartlarla tekrar ettiren, iOS ve Android uyumlu çevrimdışı bir Expo uygulamasıdır. Üyelik, backend veya internet bağlantısı gerektirmez.

## Kurulum

Gereksinimler: güncel Node.js LTS ve npm.

```bash
npm install
```

Projeyi sıfırdan oluşturmak için temel alınan komutlar:

```bash
npx create-expo-app@latest cardmemo --template blank-typescript
cd cardmemo
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage
npm install zustand uuid
npm install --save-dev @types/uuid jest-expo jest @types/jest eslint prettier
```

## Çalıştırma ve doğrulama

```bash
npx expo start
npm test
npm run lint
```

Expo terminalinden `i` ile iOS Simulator, `a` ile Android emulator veya QR kod ile Expo Go açılabilir.

## Yapı

- `src/domain`: Word entity ve repository sözleşmesi
- `src/data`: AsyncStorage ve repository uygulaması
- `src/stores`: kelime ve tekrar oturumu Zustand store'ları
- `src/screens`: ana sayfa, ekleme/düzenleme, tekrar ve özet ekranları
- `src/components`: tekrar kullanılabilir arayüz bileşenleri
- `src/utils`: doğrulama, karıştırma, kimlik ve tarih yardımcıları

Başlıca paketler Expo, React Native, React Navigation Native Stack, Zustand ve AsyncStorage'dır. Testler Jest/Jest Expo ile çalışır; kod kalitesi ESLint ve Prettier ile korunur.
