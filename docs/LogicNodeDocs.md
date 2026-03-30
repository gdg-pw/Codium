# Dokumentacja węzła bramki logicznej

Podstawowa bramka logiczna pozwalająca na dynamiczną zmianę wykonywanej operacji boolowskiej z poziomu interfejsu (dropdown).

- **Motyw kolorystyczny:** Niebieski (`--blue`, `--bluedark`, `--whiteblue`)

## Stan wewnętrzny
| Parametr | Typ | Domyślnie | Opis |
| :--- | :--- | :--- | :--- |
| `gateType` | `string` | `'AND'` | Typ operacji do wykonania. Możliwe opcje: `AND`, `OR`, `NOT`, `XOR`, `XNOR`, `NOR`, `NAND`. |
| `label` | `string` | `undefined` | (Opcjonalnie) Niestandardowa etykieta wyświetlana na bramce. |

## Złącza
| Typ (Kierunek) | ID Złącza | Pozycja | Opis |
| :--- | :--- | :--- | :--- |
| **Input** (Target) | `a` | Lewo | Sygnał wejściowy A (boolean). |
| **Input** (Target) | `b` | Lewo | Sygnał wejściowy B (boolean). Ignorowany w przypadku bramki `NOT`. |
| **Output** (Source)| `out` | Prawo | Wynik operacji logicznej wykonanej na wejściach A i B. |