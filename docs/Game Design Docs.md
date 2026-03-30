**18.03.2026**

/* Tutaj będzie opis jak budować levele pod kątem tematyki i sposobu działania \*/

Dziękuję za przesłanie brakujących plików. Masz teraz kompletny, modularny system. Poniżej znajduje się finalna wersja dokumentacji w formacie `.md`, która uwzględnia logikę `BlockRunner` oraz unię dyskryminatywną w `BlockResult`.

---

# Dokumentacja MathBlocks:

## 🛠 Architektura Systemu

System składa się z trzech warstw:
1.  **Warstwa Typów**: Definiuje standard komunikacji między modułami.
2.  **Warstwa Operacyjna**: Niezależne moduły wykonujące konkretne obliczenia.
3.  **Warstwa Wykonawcza**: Interfejs typu *facade*, który upraszcza wywoływanie operacji.

---

## 📄 Opis Plików

### `BlockResult.ts`
Definiuje ścisły format odpowiedzi przy użyciu **Unii Dyskryminatywnej** (Discriminated Union). Dzięki temu TypeScript wymusza sprawdzenie flagi `success` przed uzyskaniem dostępu do wyniku.

```typescript
type BlockResult = 
  | { success: true; result: number } 
  | { success: false; error: string };
```

### `BlockRunner.ts`
Główny punkt wejścia aplikacji. Mapuje przyjazne nazwy operacji (`BlockType`) na konkretne funkcje z folderu `Operations`.

* **Dostępne typy:** `add`, `subtract`, `multiply`, `divide`.
* **Funkcja `runBlock`:** Przyjmuje typ operacji oraz dwa parametry `number`, zwracając ustandaryzowany `BlockResult`.

### Folder `Operations/`
Każdy plik w tym folderze odpowiada za jedną operację matematyczną:
* **add.ts**: Dodawanie z kontrolą przepełnienia.
* **substract.ts**: Odejmowanie (uwaga: literówka w nazwie pliku, funkcja to `subtractionBlock`).
* **multiplication.ts**: Mnożenie z walidacją `isFinite`.
* **division.ts**: Dzielenie z blokadą dzielenia przez zero.

---

## 🚀 Przykłady Użycia

### Wykorzystanie przez Runner (Zalecane)
```typescript
import { runBlock } from "./BlockRunner";

const res = runBlock("divide", 10, 2);
if (res.success) {
    console.log(res.result); // 5
}
```

### Bezpośrednie wywołanie bloku
```typescript
import { additionBlock } from "./Operations/add";

const res = additionBlock(5, 5);
```

---

## ⚠️ Uwagi Techniczne
1.  **Bezpieczeństwo**: biblioteka nie zwraca `Infinity` ani `NaN`. W przypadku operacji niebezpiecznych, zwraca `success: false` wraz z opisem błędu.