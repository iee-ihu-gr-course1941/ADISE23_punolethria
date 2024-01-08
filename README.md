Table of Contents
=================
   * [Εγκατάσταση](#εγκατάσταση)
      * [Απαιτήσεις](#Απαιτήσεις)
      * [Οδηγίες Εγκατάστασης](#οδηγίες-εγκατάστασης)
   * [Περιγραφή API](#περιγραφή-api)
      * [Methods](#methods)
         * [Εγγραφή παικτών](#signup)
         * [Σύνδεση παικτών](#login)
         * [Reset των πινάκων](#resetboards)
         * [Τοποθέτηση των πλοίων στους πίνακες](#placeShipOnBoard)
         * [Διαπίστωση για το εάν υπάρχει πλοιο στο αντίστοιχο κελί του πίνακα που αναφέρεται στα πλοία του αντιπάλου.](#attackShip)
         * [Ενημέρωση του status του παιχνιδιού](#gameStatus)
         * [Reset του status του παιχνιδιού](#resetStatus)
         * [Λήψη του γύρου του παιχνιδιού](#getRound)
            * [Ανάγνωση κατάστασης παιχνιδιού](#ανάγνωση-κατάστασης-παιχνιδιού)
      * [Entities](#entities)
         * [Πίνακες](#boards)
         * [Players](#players)
         * [Game_status](#game_status)


# Demo Page

Μπορείτε να κατεβάσετε τοπικά ή να επισκευτείτε την σελίδα: 
https://users.iee.ihu.gr/~iee2019057/ADISE23_punolethria/



# Εγκατάσταση

## Απαιτήσεις

* Apache2
* Mysql Server
* php

## Οδηγίες Εγκατάστασης

 * Κάντε clone το project σε κάποιον φάκελο <br/>
  `gh repo clone iee-ihu-gr-course1941/ADISE23_punolethria`

 * Βεβαιωθείτε ότι ο φάκελος είναι προσβάσιμος από τον Apache Server. πιθανόν να χρειαστεί να καθορίσετε τις παρακάτω ρυθμίσεις.

 * Θα πρέπει να δημιουργήσετε στην Mysql την βάση με όνομα 'adise23' και να φορτώσετε σε αυτήν την βάση τα δεδομένα από το αρχείο schema.sql

 * Θα πρέπει να φτιάξετε το αρχείο lib/config_local.php το οποίο να περιέχει:
```
    <?php
	$DB_PASS = 'κωδικός';
	$DB_USER = 'όνομα χρήστη';
    ?>
```

# Περιγραφή Παιχνιδιού
<pre>
Η ναυμαχία παίζεται ως εξής: Κάθε παίκτης έχει δυο πίνακες(10x10)- έναν πίνακα για τα δικά του πλοία και έναν πίνακα για τα πλοία του αντιπάλου.
Κάθε παίκτης έχει στην διάθεσή του 4 είδη πλοίων:
   α. 1 Αεροπλανοφόρο(5 κουτάκια στον πίνακα)
   β. 1 Αντιτορπιλικό(4 κουτάκια στον πίνακα)
   γ. 1 Πολεμικό(3 κουτάκια στον πίνακα)
   δ. 2 Υποβρύχια(2 κούτακια το κάθε ένα στον πίνακα)

Οι κανόνες είναι οι εξής:
   1. Τοποθετώ ΟΛΑ τα πλοία πάνω στον πίνακα των πλόιων μας. 
      !ΠΡΟΣΟΧΗ: Τα πλοία ΔΕΝ ΠΡΕΠΕΙ ΝΑ ΕΠΙΚΑΛΥΠΤΟΝΤΑΙ.
   2. Στον πίνακα που αφορά τα εχθρικά πλοία σημαδεύω τα εχθρικά πλοία με βάση τις συντεταγμένες του κάθε κελιού.
      α. Σε περίπτωση που χτυπήσουμε εχθρικό πλοιο το κελί χρωματίζεται κόκκινο.
      β. Στην αντίθετη περίπτωση χρωματίζεται μπλε.
   3. 5.	Ο πρώτος που θα βυθίσει το σύνολο των εχθρικών πλοίων κερδίζει!

Η βάση μας κρατάει τους εξής πίνακες και στοιχεία:
   α. Ο πίνακας friendlyboard:
      Αποθηκεύει 3 στοιχεία:
         1. grammh
         2. sthlh
         3. content
      Τα πρώτα δυο αφορούν τις συντεταγμένες τοποθέτησης των πλοίων του κάθε παίκτη.
      Το τρίτο στοιχείο δίνει την πληροφορία για το εάν σε κάθε κελί υπάρχει τοποθετημένο κάποιο πλοίο. Μπορεί να πάρει την τιμή 1 ή NULL.
   α. Ο πίνακας foeboard:
      Αποθηκεύει 3 στοιχεία:
         1. grammh
         2. sthlh
         3. content
      Τα πρώτα δυο αφορούν τις συντεταγμένες τοποθέτησης των πλοίων του κάθε παίκτη.
      Το τρίτο στοιχείο δίνει την πληροφορία για το εάν σε κάθε κελί υπάρχει τοποθετημένο κάποιο πλοίο. Μπορεί να πάρει την τιμή 1 ή NULL.
   γ. Ο πίνακας paiktes:
      Αποθηκεύει 4 στοιχεία:
         1. etiketaPaikth
         2. usernamePaikth
         3. passwordPaikth
         4. idPaikth
      Το πρώτο αφορά στον τρόπο διαχωρισμού των δυο παικτών. Μπορεί να πάρει την τιμή 'friendly' ή την τιμή 'hostile'.
      Το δεύτερο αφορά το όνομα χρήστη του κάθε παίκτη. Χρησιμεύει για την σύνδεση του κάθε χρήστη στην εφαρμογή.
      Το τρίτο αφορά τον κωδικό του κάθε χρήστη. Χρησιμεύει για την σύνδεση του κάθε χρήστη στην εφαρμογή.
      Το τέταρτο αφορά το τυχαίο id που θα έχει ο κάθε παίκτης. Χρησιμοποιείται για την υλοποίηση της λογικής του session.
   δ. Ο πίνακας statuspaixnidiou:
      Αποθηκεύει 4 στοιχεία:
         1. game_status
         2. result
         3. last_change
         4. round
      Το πρώτο αφορά την κατάσταση του παιχνιδιού. Μπορεί να πάρει τις εξής τιμές, 'not active', 'initialized', 'active', 'ended', 'aborted' .
      Το δεύτερο αφορά στην ανάδειξη του νικητή του παιχνιδιού. Μπορεί να πάρει δυο τιμές, 'friendly' και 'hostile'.  
      Το τρίτο αφορά το πότε έγινε η τελευταία κίνηση στο παιχνίδι.
      Το τέταρτο αφορά την καταγραφή των γύρων του παιχνιδιού.</pre>

Η εφαρμογή καλύπτει τις εξής απαιτήσεις:
   1. Υλοποίηση WebAPI.
   2. Αρχικοποίηση σύνδεσης-authentication.
   3. Έλεγχος κανόνων παιχνιδιού.
   4. Αναγνώριση σειράς παιξιάς.
   5. Αναγνώρηση Deadlock.
   6. Χρήση json για τα δεδομένα.
   7. Αποθήκευση της κατάστασης του παιχνιδιού πλήρως σε mysql.

## Συντελεστές

Περιγράψτε τις αρμοδιότητες της ομάδας.

Προγραμματιστής 1: HTML, CSS, Javascript, PHP, Σχεδιασμός mysql

Προγραμματιστής 2: HTML, CSS, Javascript, PHP, Σχεδιασμός mysql


# Περιγραφή API

## Methods


#### Εγγραφή παικτών

```
POST /signUp/
```

Πραγματοποίηση της εγγραφής των παικτών.

Json Data:

| Field                       | Description                       | Required   |
|-----------------------------|-----------------------------------|----------- |
| playerUsername              | To όνομα χρήστη                   | yes        |
| playerPassword              | Ο κωδικός                         | yes        |
| playerPasswordRepeat        | Επανάληψη κωδικού για επιβεβαίωση | yes        |
| playerToken                 | Το μοναδικό id κάθε παίκτη        | yes        |

#### Σύνδεση παικτών
```
POST PHP/logIn/
```

Πραγματοποιήση της σύνδεσης των παικτών στην εφαρμογή

Json Data:

| Field                       | Description                       | Required   |
|-----------------------------|-----------------------------------|------------|
| playerUsername              | To όνομα χρήστη                   | yes        |
| playerPassword              | Ο κωδικός                         | yes        |
| playerToken                 | Το μοναδικό id κάθε παίκτη        | yes        |


#### Reset των πινάκων

```
POST PHP/resetBoards
```

Χρησιμεύει για την αρχικοποίηση των πινάκων και των δυο παικτών. Καλείται όταν οι παίκτες επιλέξουν το κουμπί "Έναρξη παιχνιδιού"

Json Data:

| Field                       | Description                       | Required   |
|-----------------------------| ----------------------------------|------------|
| playerToken                 | Το μοναδικό id κάθε παίκτη        | yes        |

#### Τοποθέτηση των πλοίων στους πίνακες

```
POST PHP/placeShipOnBoard
```
Json Data:

| Field  | Description                |  Required  |
|--------|----------------------------|------------|
| grammh | To όνομα χρήστη            | yes        |
| sthlh  | Ο κωδικός                  | yes        |
| id     | Το μοναδικό id κάθε παίκτη | yes        |

Χρησιμεύει για την τοποθέτηση των πλοίων στους πίνακες των δυο παικτών.


### Διαπίστωση για το εάν υπάρχει πλοιο στο αντίστοιχο κελί του πίνακα που αναφέρεται στα πλοία του αντιπάλου.

```
POST PHP/attackShip
```
Json Data:

| Field  | Description                              |  Required  |
|--------|------------------------------------------|------------|
| grammh | To όνομα χρήστη                          | yes        |
| sthlh  | Ο κωδικός                                | yes        |
| id     | Το μοναδικό id κάθε παίκτη               | yes        |
| content| Δείχνει έαν υπάρχει πλοιο στο κελί ή όχι | yes        |

Χρησιμεύει στην περίπτωση επίθεσης στα πλοια του αντιπάλου. Εάν ο χρήστης έχει etiketaPaikth = 'friendly' θέτει το content του κελιού στο οποιο επιτίθεται ίσο με NULL. Το ίδιο ισχύει στην περίπτωση που έχει etiketaPaikth = 'hostile'. 

#### Ενημέρωση του status του παιχνιδιού
```
POST PHP/gameStatus
```
Json Data:

| Field        | Description                                              |  Required  |
|--------------|----------------------------------------------------------|------------|
| id           | Το μοναδικό id κάθε παίκτη                               | yes        |
| end_of_game  | Μεταβλητή η οποια δείχνει εάν τελείωσε το παιχνίδι ή οχι | yes        |
| round        | Δείχνει σε ποιον γύρο βρίσκεται το παιχνίδι              | yes        |
| winner       | Δείχνει ποιος είναι ο νικητής του παιχνιδιού             | yes        |


Χρησιμεύει για την ενεμέρωση του status του παιχνιδιού. Στην περίπτωση που το round έχει τιμή -3 το game_status έχει τιμή 'not_ctive'. Στην περίπτωση που η τιμή του round είναι μεγαλύτερη του -3 και μικρότερο του 1 παίρνει την τιμή 'initialized'. Στην περίπτωση που το round είναι ίσο με 1 τότε το game_status παίρνει την τιμή 'active'. Στην συνέχεια μετά από κάθε κίνηση των παικτών η τιμή του round αυξάνεται κατά ένα. Κάθε φορά ελέγχεται πόσα ακόμη πλοία έχει ο κάθε παίκτης ώστε να αποφασιστεί ο νικητής. Στην περίπτωση που νικήσει ένας εκ των δύο παικτών το game_status παίρνει την τιμή ended και το result την etiketaPaikth του νικητή. 


#### Reset του status του παιχνιδιού
```
POST PHP/resetStatus
```
Json Data:

| Field        | Description                                              |  Required  |
|--------------|----------------------------------------------------------|------------|
| id           | Το μοναδικό id κάθε παίκτη                               | yes        |
| hasEnded     | Μεταβλητή η οποια δείχνει εάν τελείωσε το παιχνίδι ή οχι | yes        |
| round        | Δείχνει σε ποιον γύρο βρίσκεται το παιχνίδι              | yes        |
| winner       | Δείχνει ποιος είναι ο νικητής του παιχνιδιού             | yes        |

Χρησιμεύει για την αρχικοποίηση της κατάστασης του παιχνιδιού. Καλείται όταν το παιχνίδι τελειώνει και αναδυκνείεται ο νικητής.

#### Λήψη του γύρου του παιχνιδιού
```
POST PHP/getRound
```
Json Data:

| Field        | Description                                              |  Required  |
|--------------|----------------------------------------------------------|------------|
| round        | Δείχνει σε ποιον γύρο βρίσκεται το παιχνίδι              | yes        |

Χρησιμεύει για να γνωρίζουμε σε ποιον γύρο βρίσεκται το παιχνίδι. Χρησιμοποιείτα για να γνωρίζουμε κάθε φορά ποιος παίκτης θα επιτίθεται.

## Entities


### Πίνακες
---------

Οι δυο πίνακες του παιχνιδιού. Στον πρώτο ο κάθε παίκτης τοποθετεί τα πλοία του και στον δεύτερο πραγματοποιεί την επίθεσή του:


| Attribute                | Description                                  | Values                              |
| ------------------------ | -------------------------------------------- | ----------------------------------- |
| `grammh`                 | H συντεταγμένη x του τετραγώνου              | 0..9                                |
| `sthlh`                  | H συντεταγμένη y του τετραγώνου              | 0..9                                |
| `content`                | Δείχνει έαν υπάρχει πλοιο στο κελί ή όχι     | 0,NULL                              |


### Players
---------
To κρυφό token του παίκτη. Επιστρέφεται μόνο τη στιγμή της εισόδου του παίκτη στο παιχνίδι
O κάθε παίκτης έχει τα παρακάτω στοιχεία:


| Attribute                | Description                                                                                | Values                              |
| ------------------------ | -------------------------------------------------------------------------------------------| ----------------------------------- |
| `etiketaPaikth`          | Χρήση για τον διαχωρισμό των δυο παικτών                                                   | 'friendly', 'hostile'               |
| `usernamePaikth`         | To όνομα χρήστη                                                                            | String                              |
| `passwordPaikth`         | Ο κωδικός του παίτη. Αποθηκεύεται στην βάση χρησιμοποιώντας hashing| String                | String                              | 
| `idPaikth`               | To κρυφό token του παίκτη. Επιστρέφεται μόνο τη στιγμή της εισόδου του παίκτη στο παιχνίδι | String                              |



### Game_status
---------

H κατάσταση παιχνιδιού έχει τα παρακάτω στοιχεία:


| Attribute                | Description                                             | Values                                                         |
| ------------------------ | --------------------------------------------------------| ---------------------------------------------------------------|
| `game_status`            | Κατάσταση παιχνιδιού                                    | 'not active', 'initialized', 'started', 'ended', 'aborded'     |
| `result`                 | Ο νικητής του παιχνιδιού                                | 'friendly', 'hostile', NULL                                    |
| `last_change`            | Τελευταία αλλαγή/ενέργεια στην κατάσταση του παιχνιδιού | timestamp                                                      |
| `round`                  | καταγραφή των γύρων του παιχνιδιού.                     | integer                                                        |
