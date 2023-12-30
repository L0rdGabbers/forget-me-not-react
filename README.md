# **Forget Me Not**
## **Site Overview**
Based on the creator's very real need to organise their big projects into nice little bite chunks: this website is designed for people wanting to organise their own work or their team's work into easily accesible and clear tasks.

Forget me Not provides users with the ability to create projects along with assigning people from their friends list as project collaborators so that the workloads of large and intimidating projects can be shared between a team of individuals.

![Responsive screenshot](/src/assets/am-i-responsive.png)

[Deployed site](https://forget-me-not-react-165c57a94df3.herokuapp.com/) - Live at Heroku

# **Table Of Contents**
- [Forget Me Not](#forget-me-not)
  - [Site Overview](#site-overview)
- [Table Of Contents](#table-of-contents)
- [Planning Stage](#planning-stage)
  -  [Target Audience](#target-audience)
  -  [User Stories](#user-stories)
  -  [Site Aims](#site-aims)
  -  [Design](#design)
  -  [Colour](#colour)
- [Wireframes](#wireframes)
  - [Completed wireframes](#completed-wireframes)
    - [Forms](#forms)
    - [Details](#details)
    - [List](#list)
  - [Incomplete wireframes](#incomplete-wireframes)
    - [Calendar](#calendar)
  - [Agile Development Process](#agile-development-process)
    - [Overview](#overview)
    - [Sprint 1 Notes](#sprint-1-notes)
    - [Sprint 2 Notes](#sprint-2-notes)
    - [Sprint 3 Notes](#sprint-3-notes)
    - [Sprint 4 Notes](#sprint-4-notes)
    - [Incomplete User Stories](#incomplete-user-stories)
- [Features](#features)
  - [Components](#components)
    - [Navbar Component](#navbar-component)
      - [Navlinks](#navlinks)
      - [Current Date](#current-date)
      - [Hamburger](#hamburger)
    - [Go Back Button Component](#go-back-button-component)
    - [Avatar Component](#avatar-component)
    - [Require Auth Component](#require-auth-component)
  - [Pages](#pages)
    - [Home Page](#home-page)
      - [Links](#links)
        - [Logged Out Links](#logged-out-links)
        - [Logged In Links](#logged-in-links)
    - [Project and Task Create and Edit Forms](#project-and-task-create-and-edit-forms)
      - [Clarification](#clarification)
      - [Decorative Images](#decorative-images)
      - [Input Fields](#input-fields)
        - [Collaborators and Assignees Fields](#collaborators-and-assignees-fields)
      - [Submit Button](#submit-button)
      - [Cancel Button](#cancel-button)
    - [Project and Task Detail Pages](#project-and-task-detail-pages)
      - [Header](#header)
      - [Project Middle](#project-middle)
      - [Task Middle](#task-middle)
      - [Unsafe Method Buttons](#unsafe-method-buttons)
    - [Create a Friend Page](#create-a-friend-page)
      - [Responses](#responses)
    - [Project List and Completed Project List](#project-list-and-completed-project-list)
    - [Friend List](#friend-list)
    - [Friend Requests](#friend-requests)
    - [My Profile Page](#my-profile-page)
    - [Profile Page](#profile-page)
    - [Sign Up Page](#sign-up-page)
    - [Sign In Page](#sign-in-page)
    - [Error 404](#error-404)
- [Future Development](#future-development)
- [Development Bugs](#development-bugs)
  - [Big Bug](#big-bug)
  - [Unresolved Bugs](#unresolved-bugs)
- [Verification](#verification)
  - [ESlint](#eslint)
  - [CSS3](#css3)
  - [Lighthouse](#lighthouse)
- [Manual Testing](#manual-testing)
  - [User Story](#user-story)
  - [Security](#security)
- [Deployment](#deployment)
  - [Heroku](#heroku)
  - [Backend Link](#backend-link)
- [Technologies Used](#technologies-used)
- [Imported Libraries](#imported-libraries)
- [Credit](#credit)
- [Honourable Mentions](#honourable-mentions)

- People who are slightly disorganised and need a way of breaking down intimidating pieces of work into smaller, more manageable tasks.
- People who work in groups and need a way of establishing which collaborator needs to do which task.
- People/Companies who oversee a lot of work and need a way of organising the work and workers to see which tasks are the most urgent.
  
## **User Stories**

- As a user, I can use a navbar on all pages so that I can get to any desired page.
- As a User, I can navigate between pages effortlessly so that I can use the website without any page refreshes.
- As a User, I can sign into my profile so that I can access my projects, tasks, and friends list.
- As a user, I can sign up to the website so that I can access all the content available to authenticated users.
- As a user, I can determine clearly whether I am logged in or not so that I can log back in if need be.
- As a user, I can remained logged in (for at least 24 hours) so that I can enjoy my experience without being logged out every 5 minutes.
- As a logged out user, I can see 'sign in' and 'sign up' options so that I can update my signed in status.
- As a user, I can use avatars so that so that I can show off my personality and quickly identify others.
- As a logged in user, I can create projects so that I can organise myself and set clear deadlines.
- As a user, I can view the details of my projects or projects that I'm a colaborator of so that I can see the tasks and deadlines of the project.
- As a logged in user, I can create tasks associated to my projects so that I can break up my projects into bite-sized chunks.
- As a logged in user, I can view my projects' tasks or tasks that I'm associated with so that I can the tasks details.
- As an owner of a project, I can edit or delete my projects or their assoicated tasks so that I can edit or remove any mistakes in any of my projects.
- As a logged in user, I can send a friend request to another user so that I can make them collaborators on my future projects.
- As a user, I can accept or decline any friend requests that were sent to me so that I can confirm whether I want a particular user to work on my projects.
- As a user, I can cancel any friend requests that I sent before they are accepted by the recipient so that I can prevent people that I didn't mean to send requests from seeing my request in the first place.
- As a logged in user, I can see a list of my friends so that I can decide who should be collaborators on my projects and tasks.
- As a project owner, I can edit my projects and tasks so that I can change my projects' collaborators or change any neccessary details regarding the project.
- As a project owner, I can confirm that a project is complete so that I can remove it from my todo projects.
- As a project owner or task collaborator, I can confirm that a task is complete so that I can mark a project's task's completion status is positive.
- As a user, I can attatch a file, such as a word document or a powerpoint file so that I can allow other collaborators to view the work I have done.
- As a user, I can open a calendar so that I can see the deadlines of my projects and my tasks.
- As a user, I can message my friends or fellow collaborators so that I can keep work related discussions in one location.
- As a user, I can view other users' profile pages so that I can see if I want to send them a friend request, or view our friendship status.
- As a user, I can edit my profile page so that I can add my own bio and profile image.

![User Stories](/src/assets/user-stories.png)


## **Site Aims**

The Forget Me Not site had two main goals:

1. To allow people to organise their big life or work projects into a clear and categorised space.
2. To provide a place for people to work together by providing the opportunity to allocate project tasks to specific collaborators.

## **Design**

### **Colour**

Because the application is more character based rather than image based, I thought it best to use minimal colouring with shades of white to make up the structure of the page: #f8f8f8 for the app's background colour and #ffffff for the background of all components.

Since the website's name was Forget Me Not, which is also the name of a purple flower, I decided to use shades of purple for my site, however, since Forget-me-nots are a light shade of purple, I opted to use darker shades: #63336B for the buttons, #CBA6FF for text on dark backgrounds on the Home Page.


![Home Page](/src/assets/home-page.png)

To contrast when hovered, I used #d4af37, a shade of gold to stand out clearly from the purple and the white.

![Hero Image](/src/assets/project-list.png)

## **Wireframes**

I had used wireframes to help imagine my application, and whilst the overall layout of the pages changed over time, the objective of each completed wireframe remained more or less the same.

### **Completed wireframes**

#### **Forms**

The Create and Edit Forms have largely remained the same throughout development, there are some noticable differences, for example the Project Create Page now acquires collaborators using checkboxes and not by using pop up menus.

![Create Project - Wireframe](/src/assets/create-project-wireframes.png)

As for the Create Task Page, the original idea for an add file feature can be seen, which unfortunately did not make it to the final deployed project.

![Create Task - Wireframe](/src/assets/create-task-wireframes.png)

#### **Details**

The Details Page is wildly different in terms of how it organises a project's tasks and how they are displayed to the user, but the purpose of having clear and descriptive due dates and assignees is preserved in the current Project and Task Details page.


![Details - Wireframe](/src/assets/projects-wireframes.png)

#### **List**

The List Pages, which include the Friend List Page, the Friend Request Page and both Project List pages more of less stem from this wire frame. However, they are now much less clunky and stack vertically instead of horizontally.

![Project List - Wireframe](/src/assets/my-projects-wireframes.png)

### **Incomplete wireframes**

#### **Calendar**

I was actually quite eager to implement a calendar system, I didn't think I was quite adept enough at using Bootstrap to utilise the grid system to design my own calendar at such a late stage in development.

Still looks pretty though.

![Calendar - Wireframe](/src/assets/calendar-wireframe.png)



# **Agile Development Process**

## **Overview**

This section will specifically discuss the front end for this project.
For the backend, please visit the [Forget Me Not DRF API](https://github.com/L0rdGabbers/forget-me-not-drf).

## Sprint 1 notes:
For my first sprint, I had decided on implementing the NavBar as this would be the main tool for navigating between pages and it was present on every page. I also focused on the sign in and sign up functions since users have to be logged in to access the API.

### 9/12/23
* Today's work consisted of using the Navbar from the Code Institute Moments Example, but reimagining it for my portfolio's purposes, such as including 'Projects' and 'Friends' icons.

### 11/12/23 - 13/12/23
* During this time I focused on the development of the sign up and sign in pages, as well as creating dropdown menus for the 'Projects' and 'Friends' tabs in the Navbar.

### Completed User Stories:
- As a user, I can use a navbar on all pages so that I can get to any desired page.
- As a User, I can navigate between pages effortlessly so that I can use the website without any page refreshes.
- As a User, I can sign into my profile so that I can access my projects, tasks, and friends list.
- As a user, I can sign up to the website so that I can access all the content available to authenticated users.
- As a user, I can determine clearly whether I am logged in or not so that I can log back in if need be.
- As a user, I can remained logged in (for at least 24 hours) so that I can enjoy my experience without being logged out every 5 minutes.
- As a logged out user, I can see 'sign in' and 'sign up' options so that I can update my signed in status.

## Sprint 2 notes
* For my second sprint I had decided to work on the FriendCreateForm page, the FriendList page (so that I would be able to add the collaborators to my projects), and the FriendRequests page.

### 13/12/23
* I started work on the CreateFriendForm and added some functionality to ensure that users wouldn't be able to add themselves (or people that were already friends etc.) once the add friend functionality was completed

### 14/12/23
* I finalised the add friend functionality and created the FriendList page, so that the unfriend functionality could be implemented.
* I added the ability for a user to cancel their sent friend requests, as well as accept or decline any friend requests they might have received.

### 15/12/23
* I noticed an issue with the send friend request validation methods, so I implemented a series of ifs and else ifs to ensure that only profiles who had no friend status with the user could be friended.

### Completed User Stories:
- As a logged in user, I can send a friend request to another user so that I can make them collaborators on my future projects.
- As a user, I can accept or decline any friend requests that were sent to me so that I can confirm whether I want a particular user to work on my projects.
- As a user, I can cancel any friend requests that I sent before they are accepted by the recipient so that I can prevent people that I didn't mean to send requests from seeing my request in the first place.
- As a logged in user, I can see a list of my friends so that I can decide who should be collaborators on my projects and tasks.

## Sprint 3 notes
* At this point, I had begun developing the Project's and Task's Create and List pages. Since now users were able to have friends in their friends list, they were able to appoint collaborators, so project creation was now possible.

### 17/12/23
* Most of the ProjectCreateForm was fairly standard, the most difficult part to implement was the option to add numerous collaborators onto one project. (I actually spent the whole day fixing that problem and it will feature as this project's Big Bug Number One, plus it made me miss villiage caroling.)
* I had also updated the back end serializer for the project so that it could display how many of a project's tasks had been completed and how many had not. 

### 18/12/23
* Since it followed a similar format, I begun the creating the TaskCreateForm, which worked much more quickly.
* I had begun working on the displaying of the ProjectEditForm, however it would prepopulate the data fields.
* During a meeting with my mentor, we went over the ProjectEditForm and fixed the issue so that ProjectEditForms would be prepopulated with data.

### 20/12/23
* A major issue occured when testing the Unfriend system in the FriendList page, wherein the Friend model ID was not the same as the profile's ID, and so the wrong friend would be unfriended. This fix for this bug involved updating the serializer fields in the backend and then specifying which ID had to be used in the unfriend handler.
* I created and finished the TaskEditForm, quite easily, since it had very similar code from the ProjectEditForm.
* I created a responsive Back Button component so that the user always had the ability to go back a page.

### Completed User Stories:
- As a logged in user, I can create projects so that I can organise myself and set clear deadlines.
- As a user, I can view the details of my projects or projects that I'm a colaborator of so that I can see the tasks and deadlines of the project.
- As a logged in user, I can create tasks associated to my projects so that I can break up my projects into bite-sized chunks.
- As a logged in user, I can view my projects' tasks or tasks that I'm associated with so that I can the tasks details.
- As an owner of a project, I can edit or delete my projects or their assoicated tasks so that I can edit or remove any mistakes in any of my projects.
- As a project owner, I can edit my projects and tasks so that I can change my projects' collaborators or change any neccessary details regarding the project.
- As a project owner, I can confirm that a project is complete so that I can remove it from my todo projects.
- As a project owner or task collaborator, I can confirm that a task is complete so that I can mark a project's task's completion status is positive.

## Sprint 4 notes
* Boring stuff out of the way, now it's time to show off! This sprint focused on the Profile Page, so that users could view profile pages, and update their ones.
* After the profile page was out of the way, I began working on improving the overall UX and the styling of the project.

### 21/12/23
* At the end of the day, I had managed to get a user's name and default avatar showing in a profile page, but it still required work to display whether it was the user's own profile, the profile of someone they knew, a collaborator they happened to be associated on a project with or somewhere inbetween.

### 23/12/23
* Implementing code that could receive data from currentUser or from a get request to a specific profile, was imensely frustrating. In the end I made two Pages: the MyProfilePage and the ProfilePage so that I could handle the different data types more easily.
* To make the form pages more attractive, I added some images which match the stages of a project's development.

### **CHRISTMAS BREAK!**
* Happy belated Christmas to you.

### 27/12/23
* I had begun working on the Home Page so that a user would be prompted to create a new project or work on the most urgent project or task. It would also have functionality to check whether the user had any projects.
* I created the RequireAuth functionality so that user's couldn't just type things into the URL and get access to certain projects, thus encouraging the use of the pathways on the screen.

### 28/12/23
* Project deployment and touchups to the readme.

### Completed User Stories:
- As a user, I can use avatars so that so that I can show off my personality and quickly identify others.
- As a user, I can view other users' profile pages so that I can see if I want to send them a friend request, or view our friendship status.
- As a user, I can edit my profile page so that I can add my own bio and profile image.

## Incomplete User Stories:
- As a user, I can attatch a file, such as a word document or a powerpoint file so that I can allow other collaborators to view the work I have done.
- As a user, I can open a calendar so that I can see the deadlines of my projects and my tasks.
- As a user, I can message my friends or fellow collaborators so that I can keep work related discussions in one location.

### Incomplete Story Notes:
* I had tried to implement the file attatchment functionality to the backend, since it seemed like this would be a great way to organise a project by having completed documents all in one online cloud space, but it proved to be quite time consuming for one feature and as such it will remain a feature for future implementation.
* A calendar to view how busy certain time periods could be felt like a very suitable thing for this project, but unfortunately, I have never worked with a calendar before and was felt that it ought to remain an idea for future implementation.
* This idea seemed very sensible to allow messages between a project owner and their collaborators to help clarify the necessities of certain tasks. Personally, I am quite dissapointed that I didn't think to implement this earlier during backend development, but I was really unsure that I would be able to implement a friend system in the first place, so I feel satisfied with the idea of implementing friend messaging as a future feature.

# **Features**

## **Components**

These Components feature on a variety of pages.

### **Navbar Component**

#### **Navlinks**

The Navbar has three sets of Navlinks: standard, logged in and logged out. If a page which can be requested by a navlink is displaying, the icon will turn purple to indicate the user's online location. It always displays at the top of the page.

* The only standard navlink is the Home Page Link, and is always visible
* The logged out navlinks include the sign in and the sign up link. Should currentUser return null, i.e. the user is not logged in, these icons will display.

![Logged Out Navbar](/src/assets/navbar-logged-out.png)

* The logged in navlinks include the projects, friends, sign out and profile navlinks and are visible whenever the user is logged in. The profile navlink will feature an Avatar which has a default value.

![Logged In Navbar](/src/assets/navbar-logged-in.png)

#### **Current Date**
In the middle of the navbar, the current date is displayed.

#### **Hamburger**
The Hamburger icon appears at screen widths below 1200px. Should the user use the Hamburger Icon to access the Navlinks, the projects and friends dropdown menus will BOTH display. This is because the Hamburger dropdown navbar will close after one click on any location, and touch phone users will not be able to hover over the icons to view the dropdown navlinks.

![Hamburger](/src/assets/hamburger.png)

### **Go Back Button Component** 
The Go Back Button allows the user to return to the previous page, provided it isn't the home page, deleted page, or an error page.
On large screen sizes, it will appear at the left, and on smaller ones, it will appear at the bottom.

![Go Back Button - Side](/src/assets/create-form.png)

![Go Back Button - Bottom](/src/assets//go-back-button-bottom.png)

### **Avatar Component**

The Avatar Component returns a circular image containing a user's profile image. They are used as a visual counterpart to a user's username. They appear of the Profile Pages, the Friend List Page an dthe Create Friend Form.
![Avatar](/src/assets/avatar.png
)
If a user has not assigned themselves an avatar, a default one is provided.
![Default Avatar](/src/assets/default-avatar.png)

### **Require Auth Component**

For any page that requires authorisation, I have implemented a Require Auth Component so that users cannot use the url to navigate wantonly accross the site. If a user is not logged in, they will be redirected to the Error 404 page.

## **Pages**

### **Home Page**
The Home Page acts as a warm welcome to new users and a quick and easy place to get started for seasoned users.

#### **Links**

##### **Logged Out Links**
* If a user is logged out, the option for them to log in or sign up will be provided.

![Home Page: Logged Out](/src/assets/home-page-logged-out.png)

##### **Logged In Links**
* Logged In users might will see a variety of things. A link to the create project form, a link to their tasks and projects which have the shortest ammount of days before their due date and will also show them the project that has been updated most recently. The titles of their projects and tasks will dispplay at the bottom of their respective image.

![Home Page](/src/assets/home-page.png)

* If the user has no projects that meet these criteria, the links will simply be deactivated and display as not allowed to the user.

![Home Page: Disabled](/src/assets/home-page-disabled.png)

### **Project and Task Create and Edit Forms**

#### **Clarification**
These Pages have far more similarities than differences, so they will be featured in bulk.

#### **Decorative Images**

Each page featues a decorative image which all resemble the process that each form plays a part in, to help remind the user which page they are on.

![Edit Profile page](/src/assets/edit-project-page.png)

#### **Input Fields**

To the right of the page is an Form Container, which allows the user to handle changes to the Project or Task they are creating. The Title, Summary and Due Date fields will display errors if they are not filled in.

In the edit form pages, an option to complete the project or task will be available.

![Input Field Errors](/src/assets/create-task-errors.png)

##### **Collaborators and Assignees Fields**

In the Projects Create and Edit Forms, the Collaborator Check Options are retreived from the User's Personal Friend List, 
where as in the Tasks Create and Edit forms, the Assignee check options are retrieved from the Task's original project's collaborators as well as the Project's owner. Projects and Tasks do not require collaborators or assignees, respectively.

#### **Submit Button**

Assuming the inserted data is valid, upon clicking the Submit button labeled either 'Create' or 'Update', the data will be created or posted and the user will be redirected to a relevant page. The Project Create Page will redirect to the Projects List Page, the Project Edit Page and the Task Create Page will return back to the relevant Project Details Page, and the Task Edit Page will return to the Task Details Page.

#### **Cancel Button**

This button will return the user to the previous page.

### **Project and Task Detail Pages**

As before, this section discuss the project and task detail pages in the same section of the readme file.

#### **Header**

At the top of a project or task detail page, will display the title of the page, followed by the date it was created, the last time it was updated and its due date.

![Detail Page - Header](/src/assets/detail-title.png)

#### **Project Middle**

The Middle of the Project Details Page displays its summary, owner and project collaborators on the left of the section. Each Collaborator Name is also a link to that user's profile page (to be discussed further on).

The Right side displays the project's days before due date and will also display if a project is overdue.
It will list the Projects completed and uncompleted tasks to all the users, but only collaborators that have been assigned to a task will be able to access it's link.

![Project Detail Page - Middle](/src/assets/detail-middle.png)

If the user is has been assigned a task, it will show up on the list of tasks.

The 'Add Task' button is displays only if the user is the Project owner. 

![Project Detail Page - Complete](/src/assets/detail-project-collaborator.png)

If a project has been completed, it will display as so in this section.

![Project Detail Page - Complete](/src/assets/project-complete.png)

#### **Task Middle**

The Middle of the Task Details Page displays its summary, owner and task assignees on the left of the section. Each Assignee Name is also a link to that user's profile page (to be discussed further on).

The Right side displays the task's importance and the number of days before it is due and will also display if a project is overdue.

There will also be a green submit button so that a collaborator can submit the task, and will thereupon be redirected to the original Project Details Page.

![Task Detail Page](/src/assets/task-details.png)

If a Task has been completed, it will display so in the right side of the page, instead of the due date and the submit button.

![Task Completed](/src/assets/task-complete.png)

![Project - Task Complete](/src/assets/project-completed-task.png)

#### **Unsafe Method Buttons**

If the user is the project's or task's owner, a div at the bottom will display a series of buttons allowing the user to submit, edit or delete a project/task.

![Unsafe Buttons](/src/assets/owner-options.png)

The Project Submit button will mark a project as complete and redirect the user to the Completed Projects List Page.

The Task Submit button will mark a task as complete and redirect the user to the original Project Details View.

The Edit Buttons will direct the user to the Project/Task Edit Form Page.

The Project Delete Button will delete the current project and redirect the user to the Deleted Page.

![Project Deleted](/src/assets/project-deleted.png)

The Task Delete Button will delete the current task and redirect the user to the original Project Details Page.

### **Create a Friend Page**
This Page allows for a user to search for their friend's username and send them a friend request, and allows for a variety of conditions where sending a friend request is not permitted.

#### **Responses**

If the user has no friend status with the entered username, the found profile's avatar and username will be displayed along with a send friend request button, which will send the desired profile a friend request and redirect the user to the Friend Requests Page.

![Send Friend Request](/src/assets/bananaman.png)

If the user already has the desired profile as a friend, has a friend request either to or from the desired user, or even types in their own name, the relevant response will be displayed.

![Already Friend](/src/assets/already-friend.png)

![Request to Self](/src/assets/request-to-self.png)

![Request already sent](/src/assets/request-already-sent.png)

If a friend request has already been received by the user, but maybe has not noticed prior to now, it will show the user and display accept and decline buttons, which will both perform the described action before redirecting the user to their Friends List.

![Request already received](/src/assets/request-already-received.png)

If the user types in a username that is not registered or submits an empty string, the relevant messages will display.

![Username Not Found](/src/assets/unlisted-name.png)

![No Username Entered](/src/assets/friend-blank.png)

### **Project List and Completed Project List**

The following two pages are exactly the same, aside from one aspect, one lists the completed projects, and the other lists the incompleted projects.

![Project List](/src/assets/project-list.png)

Each project that a user either owns or collaborates on is displayed on the relevant list. The project's due date, last updated date, completed tasks, remaining tasks and collaborators are displayed as well as the user's own personal role within this project.

### **Friend List**

This list displays all users who have confirmed a friend request between each other.

![Friend Request](/src/assets/friend-list.png)

Each username is also a link to the friend's profile page.

Additionally, there is an unfriend button which if triggered, will remove both the user and the friend from both user's friend lists. It will then rerender the Friend List page and display an error.

![Unfriended](/src/assets/unfriended.png)

### **Friend Requests**

This list displays the users received and sent friend requests and permits them to either accept or decline requests from others as well as cancel any sent friend requests not yet accepted or declined.

![Friend Requests](/src/assets/friend-requests.png)

If a user accepts a friend request, the sender's profile will be added to the receiver's friend list and vice versa, before being redirected to the user's friend list.

The Decline and Cancel buttons delete the friend request object from the database, before redirecting the user back to their friend list.

### **My Profile Page**

This page allows for the user to look at their profile image and bio, as well as button link to the profile edit page.

![My Profile Page](/src/assets/my-profile.png)

### **Profile Page**

This page allows for the user to view another user's profile's image, bio as well as the number of completed or incompleted projects that the two have worked on together.

If the user has not written a biography yet, some place holder text will display instead.

![Profile Page](/src/assets/friend-profile.png)

If the user opens a profile page of someone who is not their friend, or someone who has sent them a friend request they will be able to handle their friend status directly.

![Not a Friend](/src/assets/not-friend.png)

![Request Received](/src/assets/profile-request-received.png)

If the user has sent a friend request to a user, an inactive button will display to let the user know that a friend request has already been sent.

![Request Sent](/src/assets/profile-request-sent.png)

### **Sign Up Page**

This page acts as a form to allow the user to create a new profile.

![Sign Up Page](/src/assets/sign-up-page.png)

Should the user enter a username or email that has already been taken, it will raise an error and not submit.

![Sign Up Errors](/src/assets/sign-up-errors.png)

Or should the user enter two different passwords, another error will display.

![Password Error](/src/assets/wrong-password.png)

### **Sign In Page**

This page allows for the user to log into their profile.

![Sign In Page](/src/assets/sign-in-page.png)

Should the user successfully enter the username and password, the application wide current user context is updated and will refresh every 5 minutes for 24 hours.

### **Error 404**

Should a user try to access a non-existant object page, or try to access a project or task they do not have access by typing code into the url, they will be automatically redirected to the Error 404 page, which contains a link back to the home page.

![Error 404](/src/assets/error-404.png)

# **Future Development**

My ideas for future development stem from my original user stories that I did not have time to implement.

- The ability to message friends individually.
- The ability to have a huddle type chatroom with a projects collaborators.
- The ability to send a friend request via email instead of username.
- The ability to view a user's personal calendar and see on what days certain projects are due.
- The ability to send files onto the project's platform

# **Development Bugs**

## **BIG BUG**

Issue - After creating the Project Create Form, the form would not accept a submission of a project with more than 1 collaborator.

Cause - The DRF API only accepted an array of profile IDs as strings of numbers, and would not accept an array of integers, so a line of code ensuring that collaborator ids were integers prevented this from properly submitting.

![Big Bug #1](/src/assets/parse-int-bug.png) 

Fix - Removing the verifying line of code allowed for the values to be submitted to the DRF API.

Note: I spent 7 hours on this bug, and the margin of error was a series of quotation marks! Use diffchecker more often, kids!

Issue - Unfriending method inconsistent. Ofttimes, it would unfriend the wrong friend, or just wouldn't unfriend anyone.

Cause - The delete method was targeting the user's profile ID as opposed to the user's friend ID, which were not the same numbers.
Fix - After readjusting the Friend Details Serializers, I specified the difference between a user's profile ID and their friend ID.

Issue - Project Edit Form would not pass the Project's current data into the input fields, thus forcing the user to retype everything they didn't want changed all over again.

Cause - Even though the project had been defined through a get request, the values of the project hadn't been assigned to the Edit Form's input values.

Fix - After learning how to assign the projectData to the New formData and passing those values onto the input fields, the problem never occured again.

Issue - If the user viewed their own profile page, their profile image wouldn't load.

![Missing Profile Image](/src/assets/from-edit-profile-page.png)

Cause - This was due to the fact that the currentUser image and a profile image were not aquired in the same way. One being entirely from a location.state and the other from a get request.

Fix - After many attempts, the simplest soultion turned out to be to make two Profile Pages, one for the user's own profile, and the other for the remaining profiles. That way each page could handle the way it accepted the profileData its own way.

## **Unresolved Bugs**

Issue - Could not log into profile on iPhone Safari. After submitting the correct username and password, the page would refresh and remain logged out. 

Temporary Fix - I did manage to get the application working on my phone, provided I turned off Prevent Cross-Site Tracking in my phone's Safari settings.

Note: Personally, I am not happy with this fix, because it really inhibits client usability. It took me a long while in Slack Chats before I finally found a solution to the problem personal problem and I could test the deployed app on my phone.

![Phone Bug](/src/assets/phone-bug.png)

# Verification

## **ESlint**

After removing all eslint warnings that appeared in my console, as shown below, the project compiled successfully with no further warnings or errors.

![ESlint warning](/src/assets/eslint-warnings.png)

![ESlint clear](/src/assets/compiled-successfully.png)

## **CSS3**

After passing all of the css modules through a CSS W3C validator, all of the returned No Errors found.

![CSS3 Validated](/src/assets/css-validated.png)

## **Lighthouse**

After running my project through lighthouse, it returned with the following results.

![Lighthouse results](/src/assets/lighthouse.png)

# **Manual Testing**

## **User Story**

Below is a summary of how I manually tested each user story.

| Checked | **As a user, I can use a navbar on all pages so that I can get to any desired page.** |
|:-------:|:--------|
| &check; | Can access the Navbar Navlink destinations from any location.  |

| Checked | **As a User, I can navigate between pages effortlessly so that I can use the website without any page refreshes.** |
|:-------:|:--------|
| &check; | All links (navbar links, home page links and profile links) work from all pages  |

| Checked | **As a User, I can sign into my profile so that I can access my projects, tasks, and friends list.** |
|:-------:|:--------|
| &check; | Once the user successfully logs into their profile, they are able to access their projects, tasks, friend lists and friend requests. |

| Checked | **As a user, I can determine clearly whether I am logged in or not so that I can log back in if need be.** |
|:-------:|:--------|
| &check; | If loggeed in, the user's profile image will appear at the top of the navbar. If not, the logged out icons and home page options will be rendered instead. |

| Checked | **As a user, I can sign up to the website so that I can access all the content available to authenticated users.** |
|:-------:|:--------|
| &check; | A logged out user is able to create a new profile and create their own projects and tasks and friends. |

| Checked | **As a user, I can remained logged in (for at least 24 hours) so that I can enjoy my experience without being logged out every 5 minutes.** |
|:-------:|:--------|
| &check; | If a user remains unactive on the site for longer than five minutes and then refreshes the page, they will remain online. |

| Checked | **As a logged out user, I can see 'sign in' and 'sign up' options so that I can update my signed in status.** |
|:-------:|:--------|
| &check; | When logged out, the sign up and sign in navlinks display in the navbar. |

| Checked | **As a user, I can use avatars so that so that I can show off my personality and quickly identify others.** |
|:-------:|:--------|
| &check; | If a user has selected their own profile image, then it can be displayed in the profile page and on other users' friend lists. |

| Checked | **As a logged in user, I can create projects so that I can organise myself and set clear deadlines.** |
|:-------:|:--------|
| &check; | Users can create projects. |

| Checked | **As a user, I can view the details of my projects or projects that I'm a colaborator of so that I can see the tasks and deadlines of the project.** |
|:-------:|:--------|
| &check; | Users can view their projects and their collaborating projects. |

| Checked | **As a logged in user, I can create tasks associated to my projects so that I can break up my projects into bite-sized chunks.** |
|:-------:|:--------|
| &check; | Users can create tasks. |

| Checked | **As a logged in user, I can view my projects' tasks or tasks that I'm associated with so that I can the tasks details.** |
|:-------:|:--------|
| &check; | Users can view their tasks and their collaborating tasks. |

| Checked | **As a logged in user, I can send a friend request to another user so that I can make them collaborators on my future projects.** |
|:-------:|:--------|
| &check; | Users can create friend requests. Users can make friends collaborators on projects and tasks. |

| Checked | **As a user, I can accept or decline any friend requests that were sent to me so that I can confirm whether I want a particular user to work on my projects.** |
|:-------:|:--------|
| &check; | Users can accept or decline friend requests. |

| Checked | **As a user, I can cancel any friend requests that I sent before they are accepted by the recipient so that I can prevent people that I didn't mean to send requests from seeing my request in the first place.** |
|:-------:|:--------|
| &check; | Users can cancel friend requests they have sent. |

| Checked | **As a logged in user, I can see a list of my friends so that I can decide who should be collaborators on my projects and tasks.** |
|:-------:|:--------|
| &check; | Users can view their own personal friend list. User can also unfriend any of their friend from this page. |

| Checked | **As a project owner, I can edit my projects and tasks so that I can change my projects' collaborators or change any neccessary details regarding the project.** |
|:-------:|:--------|
| &check; | Users can edit projects and tasks that they own. |

| Checked | **As a project owner, I can confirm that a project is complete so that I can remove it from my todo projects.** |
|:-------:|:--------|
| &check; | Users can submit their projects as complete. |

| Checked | **As a project owner or task collaborator, I can confirm that a task is complete so that I can mark a project's task's completion status is positive.** |
|:-------:|:--------|
| &check; | Users who own or are assigned to a task can submit it as complete. |

| Checked | **As a user, I can view other users' profile pages so that I can see if I want to send them a friend request, or view our friendship status.** |
|:-------:|:--------|
| &check; | Users are able to click on a link on a project or task details page, or a friend list page in order to view that profile's user data. |

| Checked | **As a user, I can edit my profile page so that I can add my own bio and profile image.** |
|:-------:|:--------|
| &check; | Users are able to edit their bio and their profile image. |

## **Security**

| Checked | **Only the project owner can edit or delete a project or task (except for the task submission put request)** |
|:-------:|:--------|
| &check; |

| Checked | **Logged out and unauthorised users cannot use the url to navigate to a page that doesn't belong to them.** |
|:-------:|:--------|
| &check; |

## **Smart Phone**

| Checked | **All pages display on small screen sizes in a nice arrangement.** |
|:-------:|:--------|
| &check; |

| Checked | **iPhone 12 is capable of performing all tasks and requests.** |
|:-------:|:--------|
| &check; |

# **Deployment**

## **Heroku**

The Front End React Project was successfully deployed to the Heroku website.

The site itself contains no Config Vars.

The site can be found here at https://forget-me-not-react-165c57a94df3.herokuapp.com/

## **Backend Link**

The Back End Django Rest Framework API was also successfully deployed to the Heroku website.
The link to the DRF API repository can be found [here](https://github.com/L0rdGabbers/forget-me-not-drf).

The Backend Heroku site can be found [here](https://forget-me-not-api-2b7c6aaeb81b.herokuapp.com/).

# **Technologies Used**
- JSX - Used for rendering Front End display
- CSS3 - Custom Styling
- Django Rest Framework (Backend)
- FontAwesome - Used for icons in the navbar.
- Heroku - Finished site deployed to Heroku

# **Imported Libraries**
- React-Bootstrap: To keep the stylings of the overall page clear, clean and consistend I used React-Bootstrap for quick mid development styling, as well as to properly and acurately make this project responsive.
- Axios: I used axios to link the front end of the project with the back end. It is formidable at quickly getting and manipulating data and is extremely useful for keeping the user authenticated after a long period of time by using refresh auth tokens.
- React Router Dom: Being able to remain on the same page and quickly swap to a desired location without a long delay is an extremly attractive quality for a website to have, which is why I incorporated it into my project.

# **Credit**
- The site was developed using Gitpod.
- The repository was saved to Github.
- Responsive screenshot made using https://ui.dev/amiresponsive
- Images: All non-avatar images were royalty free and sourced from https://pixabay.com/ 
- General references:
  - Stack Overflow
  - Code Institute Learning Platform
  - Slack Chats
  - Code Institute Tutor Assistance 

# **Honourable Mentions**
- Richard Wells: Thank you for all your help this year. It's been great fun.
- Thank you to Boswell's Cafe for providing me with a job with such flexible hours so that I was able to commit to this course.
