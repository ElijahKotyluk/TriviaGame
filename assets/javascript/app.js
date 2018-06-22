$(document).ready(function () {

    function TriviaQuestion(question, choices, answer, picture) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
        this.picture = picture;
    }
    
    const allQuestions = [
        new TriviaQuestion("Which of these is not a core data type?", ["Lists", "Dictionary", "Tuples", "Class"], 3, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("What data type is the object below? <br /> L = [1, 23, ‘hello’, 1]", ["List", "Dictionary", "Tuple", "Array"], 0, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("Which of the following function convert a string to a float in python?", ["int(x [,base])", "long(x [,base] )", "float(x)", "str(x)"], 2, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("Which of the following is true? <br />I. A hash function takes a message of arbitrary length and generates a fixed length code. <br /> I. A hash function takes a message of fixed length and generates a code of variable length. <br /> III. A hash function may give the same hash value for distinct messages.",
        ["I only", "II and III only", "I and III only", "II only"], 2, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("What will be the output of the following code : <br /> print type(type(int))", ["type 'int'", "type 'type'", "Error", "0"], 1, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("What is the output of the following code : <br /> L = ['a','b','c','d'] <br /> print ''.join(L)", ["Error", "None", "abcd", "['a', 'b', 'c', 'd']"], 2, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("What is the output of the following segment : <br /> chr(ord('a'))", ["A", "B", "a", "Error"], 0, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("What is the output of the following program : <br /> y = 8 <br /> z = lambda x : x * y <br /> print z(6)", ["48", "14", "64", "None of the above"], 0, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("What is called when a function is defined inside a class?", ["Module", "Class", "Another Function", "Method"], 3, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("Which of the following is the use of id() function in python?", ["Id returns the identity of the object", "Every object doesn't have a unique id", "All of the mentioned", "None of the mentioned"], 0, "assets/images/pythonLogoSmall.png"),
    
        new TriviaQuestion("Suppose list1 is [3, 4, 5, 20, 5, 25, 1, 3], what is list1 after list1.pop(1)?", ["[3, 4, 5, 20, 5, 25, 1, 3]", "[1, 3, 3, 4, 5, 5, 20, 25]", "[3, 5, 20, 5, 25, 1, 3]", "[1, 3, 4, 5, 20, 5, 25]"], 2, "assets/images/pythonLogoSmall.png")
    ]


    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = allQuestions.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < allQuestions.length; i++) {
        holder.push(allQuestions[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timer").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $(".questions").html("<p>Time is up! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            hidepicture();
        }	
    }

    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion() {
        index = Math.floor(Math.random()*allQuestions.length);
        pick = allQuestions[index];

        $(".questions").html("<h2>" + pick.question + "</h2>");
        
        for(var i = 0; i < pick.choices.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerChoice");
            userChoice.html(pick.choices[i]);
            userChoice.attr("data-guessvalue", i);
            $(".questions").append(userChoice);
    }
    
    $(".answerChoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $(".questions").html("<p>Correct!</p>");
            hidepicture();
    
        }
        else {
            stop();
            wrongCount++;
            userGuess="";
            $(".questions").html("<p>Wrong! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }

    function hidepicture () {
        $(".questions").append("<img src=" + pick.picture + ">");
        newArray.push(pick);
        allQuestions.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $(".questions").empty();
            timer= 20;
    
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $(".questions").empty();
            $(".questions").html("<h3>Game Over!  Here's how you did: </h3>");
            $(".questions").append("<h4> Correct: " + correctCount + "</h4>" );
            $(".questions").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $(".questions").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } 
        else {
            runTimer();
            displayQuestion();
        }
        }, 3000);
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $(".questions").empty();
        $(".questions").empty();
        for(var i = 0; i < holder.length; i++) {
            allQuestions.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })
})