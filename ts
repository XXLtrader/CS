//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Xml;
//using Newtonsoft.Json;

//class Program
//{
//    static Dictionary<string, List<string>> dictionary = new Dictionary<string, List<string>>();
//    static string dictionaryType;

//    static void Main()
//    {
//        Console.WriteLine("Введіть тип словника (наприклад, англо-російський): ");
//        dictionaryType = Console.ReadLine();

//        LoadDictionary();

//        bool exit = false;
//        while (!exit)
//        {
//            Console.WriteLine("\nМеню:");
//            Console.WriteLine("1. Додати слово та його переклад");
//            Console.WriteLine("2. Замінити слово або його переклад");
//            Console.WriteLine("3. Видалити слово або переклад");
//            Console.WriteLine("4. Шукати переклад слова");
//            Console.WriteLine("5. Експортувати словник у файл");
//            Console.WriteLine("6. Вийти");

//            int choice = GetChoice(1, 6);

//            switch (choice)
//            {
//                case 1:
//                    AddWordTranslation();
//                    break;
//                case 2:
//                    UpdateWordTranslation();
//                    break;
//                case 3:
//                    DeleteWordTranslation();
//                    break;
//                case 4:
//                    SearchTranslation();
//                    break;
//                case 5:
//                    ExportDictionaryToFile();
//                    break;
//                case 6:
//                    exit = true;
//                    break;
//            }
//        }
//    }

//    static int GetChoice(int min, int max)
//    {
//        int choice;
//        while (true)
//        {
//            Console.Write($"Виберіть опцію ({min}-{max}): ");
//            if (int.TryParse(Console.ReadLine(), out choice) && choice >= min && choice <= max)
//            {
//                return choice;
//            }
//            Console.WriteLine("Некоректний ввід. Будь ласка, введіть число від {0} до {1}.", min, max);
//        }
//    }

//    static void LoadDictionary()
//    {
//        string filePath = $"{dictionaryType}_dictionary.json";
//        if (File.Exists(filePath))
//        {
//            string json = File.ReadAllText(filePath);
//            dictionary = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(json);
//        }
//    }

//    static void SaveDictionary()
//    {
//        string filePath = $"{dictionaryType}_dictionary.json";
//        string json = JsonConvert.SerializeObject(dictionary, Formatting.Indented);
//        File.WriteAllText(filePath, json);
//    }

//    static void AddWordTranslation()
//    {
//        Console.Write("Введіть слово: ");
//        string word = Console.ReadLine();

//        Console.Write("Введіть переклад слова: ");
//        string translation = Console.ReadLine();

//        if (dictionary.ContainsKey(word))
//        {
//            dictionary[word].Add(translation);
//        }
//        else
//        {
//            dictionary.Add(word, new List<string> { translation });
//        }

//        Console.WriteLine($"Слово '{word}' та його переклад додано до словника.");
//        SaveDictionary();
//    }

//    static void UpdateWordTranslation()
//    {
//        Console.Write("Введіть слово для оновлення: ");
//        string word = Console.ReadLine();

//        if (dictionary.ContainsKey(word))
//        {
//            Console.Write("Введіть переклад, який потрібно замінити: ");
//            string oldTranslation = Console.ReadLine();

//            if (dictionary[word].Contains(oldTranslation))
//            {
//                Console.Write("Введіть новий переклад: ");
//                string newTranslation = Console.ReadLine();

//                int index = dictionary[word].IndexOf(oldTranslation);
//                dictionary[word][index] = newTranslation;

//                Console.WriteLine($"Переклад '{oldTranslation}' слова '{word}' замінено на '{newTranslation}'.");
//                SaveDictionary();
//            }
//            else
//            {
//                Console.WriteLine($"Переклад '{oldTranslation}' не знайдено для слова '{word}'.");
//            }
//        }
//        else
//        {
//            Console.WriteLine($"Слово '{word}' не знайдено в словнику.");
//        }
//    }

//    static void DeleteWordTranslation()
//    {
//        Console.Write("Введіть слово для видалення: ");
//        string word = Console.ReadLine();

//        if (dictionary.ContainsKey(word))
//        {
//            Console.Write("Введіть переклад, який потрібно видалити: ");
//            string translation = Console.ReadLine();

//            if (dictionary[word].Contains(translation))
//            {
//                dictionary[word].Remove(translation);

//                if (dictionary[word].Count == 0)
//                {
//                    dictionary.Remove(word);
//                }

//                Console.WriteLine($"Переклад '{translation}' слова '{word}' видалено з словника.");
//                SaveDictionary();
//            }
//            else
//            {
//                Console.WriteLine($"Переклад '{translation}' не знайдено для слова '{word}'.");
//            }
//        }
//        else
//        {
//            Console.WriteLine($"Слово '{word}' не знайдено в словнику.");
//        }
//    }

//    static void SearchTranslation()
//    {
//        Console.Write("Введіть слово для пошуку перекладу: ");
//        string word = Console.ReadLine();

//        if (dictionary.ContainsKey(word))
//        {
//            Console.WriteLine($"Переклади слова '{word}':");
//            foreach (string translation in dictionary[word])
//            {
//                Console.WriteLine(translation);
//            }
//        }
//        else
//        {
//            Console.WriteLine($"Слово '{word}' не знайдено в словнику.");
//        }
//    }

//    static void ExportDictionaryToFile()
//    {
//        string filePath = $"{dictionaryType}_exported_dictionary.txt";
//        using (StreamWriter writer = new StreamWriter(filePath))
//        {
//            foreach (var entry in dictionary)
//            {
//                writer.WriteLine($"Слово: {entry.Key}");
//                writer.WriteLine("Переклади:");

//                foreach (string translation in entry.Value)
//                {
//                    writer.WriteLine($"- {translation}");
//                }

//                writer.WriteLine();
//            }
//        }

//        Console.WriteLine($"Словник експортовано у файл '{filePath}'.");
//    }
//}
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static List<User> users = new List<User>();
    static List<Quiz> quizzes = new List<Quiz>();

    static User currentUser;

    static void Main()
    {
        LoadData();

        while (true)
        {
            Console.WriteLine("1. Увійти");
            Console.WriteLine("2. Зареєструватися");
            Console.WriteLine("3. Вийти");

            int choice = GetChoice(1, 3);

            switch (choice)
            {
                case 1:
                    Login();
                    break;
                case 2:
                    Register();
                    break;
                case 3:
                    SaveData();
                    Environment.Exit(0);
                    break;
            }

            if (currentUser != null)
            {
                HandleLoggedInUser();
            }
        }
    }

    static void HandleLoggedInUser()
    {
        while (true)
        {
            Console.WriteLine("\nМеню:");
            Console.WriteLine("1. Старт нової вікторини");
            Console.WriteLine("2. Переглянути результати вікторин");
            Console.WriteLine("3. Переглянути Топ-20 з конкретної вікторини");
            Console.WriteLine("4. Змінити налаштування");
            Console.WriteLine("5. Вихід");

            int choice = GetChoice(1, 5);

            switch (choice)
            {
                case 1:
                    StartQuiz();
                    break;
                case 2:
                    ViewQuizResults();
                    break;
                case 3:
                    ViewTop20();
                    break;
                case 4:
                    ChangeSettings();
                    break;
                case 5:
                    SaveData();
                    Environment.Exit(0);
                    break;
            }
        }
    }

    static void StartQuiz()
    {
        Console.WriteLine("Оберіть розділ вікторини:");
        Console.WriteLine("1. Історія");
        Console.WriteLine("2. Географія");
        // Додайте інші розділи вікторини
        Console.WriteLine("3. Змішана вікторина");

        int sectionChoice = GetChoice(1, 3);

        Quiz selectedQuiz;

        if (sectionChoice == 3)
        {
            selectedQuiz = quizzes.OrderBy(q => Guid.NewGuid()).First(); // Змішана вікторина
        }
        else
        {
            selectedQuiz = quizzes.Find(q => q.Section == (QuizSection)sectionChoice);
        }

        if (selectedQuiz != null)
        {
            int correctAnswers = selectedQuiz.StartQuiz();

            Console.WriteLine($"Ви відповіли правильно на {correctAnswers} з 20 питань.");
            currentUser.AddQuizResult(selectedQuiz.Section, correctAnswers);
        }
        else
        {
            Console.WriteLine("Вікторина не знайдена.");
        }
    }

    static void ViewQuizResults()
    {
        Console.WriteLine("\nРезультати вікторин:");
        foreach (var result in currentUser.QuizResults)
        {
            Console.WriteLine($"{result.Section}: {result.CorrectAnswers}/20");
        }
    }

    static void ViewTop20()
    {
        Console.WriteLine("Оберіть вікторину для перегляду Топ-20:");
        foreach (var quiz in quizzes)
        {
            Console.WriteLine($"{(int)quiz.Section}. {quiz.Section}");
        }

        int sectionChoice = GetChoice(1, quizzes.Count);

        Quiz selectedQuiz = quizzes.Find(q => q.Section == (QuizSection)sectionChoice);

        if (selectedQuiz != null)
        {
            Console.WriteLine($"Топ-20 гравців вікторини {selectedQuiz.Section}:");

            var top20 = selectedQuiz.GetTop20();
            for (int i = 0; i < top20.Count; i++)
            {
                Console.WriteLine($"{i + 1}. {top20[i].Username}: {top20[i].CorrectAnswers}/20");
            }
        }
        else
        {
            Console.WriteLine("Вікторина не знайдена.");
        }
    }

    static void ChangeSettings()
    {
        Console.WriteLine("\nЗміна налаштувань:");

        Console.Write("Введіть новий пароль (або Enter, щоб залишити незміненим): ");
        string newPassword = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(newPassword))
        {
            currentUser.ChangePassword(newPassword);
            Console.WriteLine("Пароль змінено.");
        }

        Console.Write("Введіть нову дату народження (або Enter, щоб залишити незміненою): ");
        string newBirthdate = Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(newBirthdate))
        {
            currentUser.ChangeBirthdate(newBirthdate);
            Console.WriteLine("Дата народження змінена.");
        }
    }

    static void Login()
    {
        Console.Write("Введіть логін: ");
        string username = Console.ReadLine();
        Console.Write("Введіть пароль: ");
        string password = Console.ReadLine();

        currentUser = users.Find(u => u.ValidateCredentials(username, password));

        if (currentUser != null)
        {
            Console.WriteLine($"Ласкаво просимо, {currentUser.Username}!");
        }
        else
        {
            Console.WriteLine("Неправильний логін або пароль.");
        }
    }

    static void Register()
    {
        Console.Write("Введіть новий логін: ");
        string newUsername = Console.ReadLine();

        if (users.Any(u => u.Username == newUsername))
        {
            Console.WriteLine("Користувач з таким логіном вже існує.");
            return;
        }

        Console.Write("Введіть пароль: ");
        string newPassword = Console.ReadLine();
        Console.Write("Введіть дату народження (у форматі YYYY-MM-DD): ");
        string newBirthdate = Console.ReadLine();

        User newUser = new User(newUsername, newPassword, newBirthdate);
        users.Add(newUser);

        Console.WriteLine("Реєстрація пройшла успішно.");
    }



