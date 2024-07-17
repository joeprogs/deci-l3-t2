// Defining Elements

const sections = document.querySelectorAll('section');
const nav = document.querySelector('nav');

const commentBtn = document.getElementById('comment-btn');
const commentForm = document.getElementById('comment-form');

const nameField = document.getElementById('name-field');
const emailField = document.getElementById('email-field');
const commentField = document.getElementById('comment-field');

const commentsList = document.getElementById('comments-list');

// Adding & Removing The .active Class From Sections.

const setActiveSection = (section) => {
  section.classList.add('active');
}

const removeActiveSection = (section) => {
  section.classList.remove('active');
}

// Get Section Height & Y Level

const getSectionData = (section) => {
  return {
    y: section.getBoundingClientRect().top,
    height: section.getBoundingClientRect().height,
  };
}

// Check If Section Is At The Top

const isSectionActive = (section) => {
  return (getSectionData(section).y >= -getSectionData(section).height && getSectionData(section).y <= 200);
}

// Update Active Section Status On Scroll

const updateActiveStatus = () => {
  sections.forEach((section) => {
    if (isSectionActive(section)) {
      sections.forEach((other) => {
        removeActiveSection(other);
      });
      setActiveSection(section);
    }
  });
}

// Active Section Event Listener

document.addEventListener('scroll', updateActiveStatus);

// Building The Nav

sections.forEach((section, i) => {
  // Creating Section Link Element
  const element = document.createElement('a');
  element.href = `#${section.id}`;
  const elementText = document.createTextNode(section.id == 'comments' ? 'Comments' : `Section ${i + 1}`);
  element.appendChild(elementText);
  element.addEventListener('click', (e) => {
    e.preventDefault();
    section.scrollIntoView({behavior: 'smooth'});
    sections.forEach((other) => {
      removeActiveSection(other);
    });
    setActiveSection(section);
  });
  nav.appendChild(element);
});

// Showing The Comment Form

commentBtn.addEventListener('click', () => {
  commentBtn.classList.add('hidden');
  commentForm.classList.remove('hidden');
});

// Creating The Comment

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Creating The Comment Element
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');

  // Creating The User Data Text Element
  const userData = document.createElement('h4');
  const userDataText = document.createTextNode(`${nameField.value} (${emailField.value})`);
  userData.appendChild(userDataText);

  // Creating The Comment Text Element
  const comment = document.createElement('p');
  const commentText = document.createTextNode(commentField.value);
  comment.appendChild(commentText);

  // Assembling The Comment
  commentElement.appendChild(userData);
  commentElement.appendChild(comment);

  // Add To The Comment List
  commentsList.appendChild(commentElement);

  // Hide Form & Clear All Fields
  commentBtn.classList.remove('hidden');
  commentForm.classList.add('hidden');

  nameField.value = '';
  emailField.value = '';
  commentField.value = '';
});