# API Validation
1. Uther Lightbringer's health to +25, failed because 'Name must be alphanumeric', changing the name still fails because Paladin isn't in the accepted classes, if you change both name and class it works
2. Shadowheart's level to 15, failed because of 'invalid class' it was defaulted to Cleric, if you change the class as well it works
3. Geralt of Rivia's health by +10, failed because 'Name must be alphanumeric', if you change name to be alpha numeric then it works

# Questions
1. They all failed, none succeeded.
2. the error messages listed above. "Name must be alphanumeric." (Uther, Geralt) and "Invalid character class." (Shadowheart, and Uther once the name was fixed)
3. The original characters were added to the db via a script, so they weren't bound by the same validation rules. When trying to update or create via the API those validation rules are applied
4. My react application displays the errors via an alert to the user as well as throws an error that can be seen in devtools with the same error message
