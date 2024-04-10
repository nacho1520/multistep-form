window.addEventListener('load', () => {
    // Global States
    var indexTab = 0;
    var globalState = {
        name: '',
        email: '',
        topics: ['', '', '']
    };

    // User's inputs
    const topics = document.querySelectorAll('.topic');
    const nameInput = document.querySelector('#name-input');
    const emailInput = document.querySelector('#email-input');
    const errorLabels = document.querySelectorAll('.error');

    // Navigation
    const continueBtns = document.querySelectorAll('#continue-btn');
    const tabs = document.querySelectorAll('.tab');
    const stepsIndicators = document.querySelectorAll('.step');
    const stepLabel = document.querySelector('.step-counter');
    
    // Summary
    const nameSpan = document.querySelector('#name');
    const emailSpan = document.querySelector('#email');
    const topicSummary = document.querySelector('.topics-list');
    
    // Setting the first tab and step indicator as active
    tabs[indexTab].classList.add('active');
    stepsIndicators[indexTab].classList.add('active');

    // The function changes the active step style
    const changeActiveStep = () => {
        stepLabel.textContent = 'Step ' + (indexTab + 1) + 'of 3';
        stepsIndicators.forEach(step => {
            step.classList.remove('active');
        });
        stepsIndicators[indexTab].classList.add('active');
    }

    // This function handles changing the tab's step
    const changeTab = () => {
        tabs[indexTab].classList.remove('active');
        stepsIndicators[indexTab].classList.add('completed');
        indexTab +=1; 
        changeActiveStep();
        tabs[indexTab].classList.add('active');
    }

    // Validates that the parameter is an email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    // Fill up the summary step with the global state info
    const buildSummary = () => {
        nameSpan.textContent = ' ' + globalState.name;
        emailSpan.textContent = ' ' + globalState.email;
        globalState.topics.forEach(topic => {
            if(topic != '') {
                const newItem = document.createElement('li');
                const newText = document.createTextNode(topic);
                newItem.appendChild(newText);
                topicSummary.appendChild(newItem);
            }
        });
    }

    continueBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if( indexTab == 0 ) {
                if(!(globalState.name == '' && globalState.email == '')) {
                    changeTab();
                }
            } else if( indexTab == 1 ) {
                if(!(globalState.topics[0] == '' && globalState.topics[1] == '' && globalState.topics[2] == '' ))
                changeTab();
                buildSummary();
            } else if( indexTab == 2 ) {
                alert("✅ Success");
            }
        });
    });

   
    // User's input validations and events 

    nameInput.addEventListener('focusin', () => {
        nameInput.classList.remove('invalid');
        errorLabels[0].classList.remove('active');
    })

    nameInput.addEventListener('focusout', () => {
        if(nameInput.value == ''){
            nameInput.classList.add('invalid');
            errorLabels[0].classList.add('active');
        } else {
            globalState.name = nameInput.value;
        }
    });

    emailInput.addEventListener('focusin' , () => {
        emailInput.classList.remove('invalid');
        errorLabels[1].classList.remove('active');
    })

    emailInput.addEventListener('focusout', () => {
        if(emailInput.value == ''){
            emailInput.classList.add('invalid');
            errorLabels[1].classList.add('active');
        } else if(!validateEmail(emailInput.value)){
            emailInput.classList.add('invalid');
            errorLabels[1].classList.add('active');
        } else {
            globalState.email = emailInput.value;
        }
    });

    topics.forEach((topic, index) => {
        topic.addEventListener('click', () => {
            if(globalState.topics[index] != '') {
                topic.classList.remove('selected');
                globalState.topics[index] = '';
            } else {
                topic.classList.add('selected');
                globalState.topics[index] = topic.textContent;
            }
        });
    });
});