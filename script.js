// Create a running date at top of page

var today = moment();
$("#currentDay").text(today.format('MMMM Do YYYY, h:mm:ss a'));


      // Objects to store on localStorage
      var tasks = {
        "9": [],
        "10": [],
        "11": [],
        "12": [],
        "13": [],
        "14": [],
        "15": [],
        "16": [],
        "17": []
    };
    
    var setTasks = function() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    
    var getTasks = function() {
    
        var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (loadedTasks) {
            tasks = loadedTasks
    
            $.each(tasks, function(hour, task) {
                var hourDiv = $("#" + hour);
                createTask(task, hourDiv);
            })
        }
        auditTasks()
    }
    
    var createTask = function(taskText, hourDiv) {
    
        var taskDiv = hourDiv.find(".task");
        var taskP = $("<p>")
            .addClass("description")
            .text(taskText)
            taskDiv.html(taskP);
    }
    
    var auditTasks = function() {
    
        var currentHour = moment().hour();
        $(".task-info").each( function() {
            var elementHour = parseInt($(this).attr("id"));
    
            if ( elementHour < currentHour ) {
                $(this).removeClass(["present", "future"]).addClass("past");
            }
            else if ( elementHour === currentHour ) {
                $(this).removeClass(["past", "future"]).addClass("present");
            }
            else {
                $(this).removeClass(["past", "present"]).addClass("future");
            }
        })
    };
    
    var replaceTextarea = function(textareaElement) {
    
        var taskInfo = textareaElement.closest(".task-info");
        var textArea = taskInfo.find("textarea");
        var time = taskInfo.attr("id");
        var text = textArea.val().trim();
    
        tasks[time] = [text];
        setTasks();
    
        createTask(text, taskInfo);
    }
    
    // Tasks 
    $(".task").click(function() {
    
        $("textarea").each(function() {
            replaceTextarea($(this));
    })
    
    var time = $(this).closest(".task-info").attr("id");
    if (parseInt(time) >= moment().hour()) {
    
        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);
    
        $(this).html(textInput);
        textInput.trigger("focus");
        }
    })
    
    // Save button
    $(".saveBtn").click(function() {
        replaceTextarea($(this));
    })
    
    // Update the tasks for each hour
    timeToHour = 3600000 - today.milliseconds();
    setTimeout(function() {
        setInterval(auditTasks, 3600000)
    }, timeToHour);
    
    getTasks();