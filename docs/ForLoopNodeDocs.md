# Dokumentacja węzła pętli for

Symuluje standardową pętlę iteracyjną, wykonując logikę podłączoną do `LOOP` zadaną liczbę razy (od `START` do `END`).

- **Motyw kolorystyczny:** Żółty (`--yellow`, `--yellowdark`) z elementami ciemnoszarymi (`--graydark`) dla kontrastu.

## Stan wewnętrzny
| Parametr | Typ | Domyślnie | Opis |
| :--- | :--- | :--- | :--- |
| `startIndex` | `number` | `undefined` | Wartość początkowa pętli (może zostać nadpisana sygnałem z wejścia). |
| `endIndex` | `number` | `undefined` | Wartość końcowa pętli (może zostać nadpisana sygnałem z wejścia). |

## Złącza
| Typ (Kierunek) | ID Złącza | Pozycja | Opis |
| :--- | :--- | :--- | :--- |
| **Input** (Target) | `execute` | Lewo (Góra) | Sygnał wyzwalający start pętli (Trigger). |
| **Input** (Target) | `startIndex` | Lewo (Środek) | Dynamiczne wejście dla wartości startowej. |
| **Input** (Target) | `endIndex` | Lewo (Dół) | Dynamiczne wejście dla wartości końcowej. |
| **Output** (Source)| `loopBody` | Prawo (Góra) | Sygnał wyzwalany w każdej iteracji pętli. Służy do podłączenia logiki. |
| **Output** (Source)| `currentIndex` | Prawo (Środek) | Wypluwa aktualną wartość iteratora (`i`) dla bieżącej pętli. |
| **Output** (Source)| `completed` | Prawo (Dół) | Sygnał wyzwalany jednorazowo po zakończeniu wszystkich iteracji. |