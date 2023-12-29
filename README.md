# **Forget Me Not**
## **Site Overview**
Based on the creator's very real need to organise their big projects into nice little bite chunks: this website is designed for people wanting to organise their own work or their team's work into easily accesible and clear tasks.

Forget me Not provides users with the ability to create projects along with assigning people from their friends list as project collaborators so that the workloads of large and intimidating projects can be shared between a team of individuals.

![Responsive screenshot](assets/responsive.jpg)

[Deployed site](Be sure to add a site name.)

# **Table Of Contents**
- [**Forget Me Not**](#forget-me-not)
  - [**Site Overview**](#site-overview)
- [**Table Of Contents**](#table-of-contents)
- [**Planning Stage**](#planning-stage)
  - [**Target Audience**](#target-audience)
  - [**User Stories**](#user-stories)
  - [**Site Aims**](#site-aims)
  - [**Site Flow Diagram**](#site-flow-diagram)
  - [**Database model**](#database-model)
  - [**Design**](#design)
- [**Agile Development Process**](#agile-development-process)
  - [**Overview**](#overview)
  - [**Admin**](#admin)
  - [**Home Page**](#home-page)
  - [**Registeration**](#registeration)
  - [**Recipe Page**](#recipe-page)
  - [**My recipes page**](#my-recipes-page)
  - [**Add Recipe Page**](#add-recipe-page)
  - [**Exceptions**](#exceptions)
    - [**Star Rating**](#star-rating)
    - [**Categories and Portions**](#categories-and-portions)
- [**Features**](#features)
  - [**Multiple Pages**](#multiple-pages)
    - [**Navbar**](#navbar)
      - [**Default**](#default)
      - [**Signed Out**](#signed-out)
      - [**Signed In**](#signed-in)
      - [**Hamburger Icon**](#hamburger-icon)
    - [**Messages**](#messages)
      - [**Signing In, Up or Out**](#signing-in-up-or-out)
      - [**Commenting**](#commenting)
    - [**Hero Image**](#hero-image)
    - [**Default Image**](#default-image)
    - [**Footer**](#footer)
  - [**Home Page**](#home-page-1)
    - [**Recipe Cards**](#recipe-cards)
    - [**Paginate Link**](#paginate-link)
    - [**Links to other pages**](#links-to-other-pages)
  - [**Categories Pages**](#categories-pages)
  - [**Recipe Form Pages**](#recipe-form-pages)
    - [**Add Recipe Page**](#add-recipe-page-1)
      - [**Unique Title**](#unique-title)
      - [**Required**](#required)
      - [**Ingredients comma separation**](#ingredients-comma-separation)
      - [**Instructions**](#instructions)
      - [**Unauthorised**](#unauthorised)
    - [**Update Recipe Page**](#update-recipe-page)
    - [**Submit/Delete Recipe Pages**](#submitdelete-recipe-pages)
      - [**Author Only**](#author-only)
  - [**Recipe Page**](#recipe-page-1)
    - [**Viewer Contribution**](#viewer-contribution)
      - [**Comments**](#comments)
      - [**Commenting**](#commenting-1)
      - [**Star Rating**](#star-rating-1)
      - [**Restricted Access**](#restricted-access)
  - [**My Recipes Page**](#my-recipes-page-1)
    - [**Recipe Status**](#recipe-status)
  - [**AllAuth Pages**](#allauth-pages)
    - [**Sign Up:**](#sign-up)
    - [**Sign In:**](#sign-in)
    - [**Logout:**](#logout)
  - [**Error Pages**](#error-pages)
    - [**Error 404:**](#error-404)
    - [**Error 500:**](#error-500)
- [**Future Development**](#future-development)
- [**Testing Phase**](#testing-phase)
  - [**Bugs**](#bugs)
    - [**Unresolved Bugs**](#unresolved-bugs)
  - [**Verifiers**](#verifiers)
    - [**HTML**](#html)
      - [**base.html**](#basehtml)
      - [**index.html**](#indexhtml)
      - [**recipe\_page.html**](#recipe_pagehtml)
      - [**my\_recipes.html**](#my_recipeshtml)
      - [**add\_recipe.html**](#add_recipehtml)
      - [**submit\_recipe.html**](#submit_recipehtml)
      - [**update\_recipe.html**](#update_recipehtml)
      - [**delete\_recipe.html**](#delete_recipehtml)
      - [**signup.html**](#signuphtml)
      - [**login.html**](#loginhtml)
      - [**logout.html**](#logouthtml)
      - [**404.html**](#404html)
      - [**500.html**](#500html)
  - [**CSS**](#css)
  - [**Python**](#python)
  - [**LightHouse**](#lighthouse)
    - [**Home Page**](#home-page-2)
    - [**Recipe Page**](#recipe-page-2)
    - [**My recipes Page**](#my-recipes-page-2)
    - [**Categories Page**](#categories-page)
    - [**Add Recipe Page**](#add-recipe-page-2)
    - [**Submit Recipe Page**](#submit-recipe-page)
    - [**Update Recipe Page**](#update-recipe-page-1)
    - [**Delete Recipe Page**](#delete-recipe-page)
    - [**Register Page**](#register-page)
    - [**Login Page**](#login-page)
    - [**Logout Page**](#logout-page)
  - [**Manual Testing**](#manual-testing)
- [**Deployment**](#deployment)
- [**Technologies Used**](#technologies-used)
- [**Honourable Mentions**](#honourable-mentions)
- [**Credits**](#credits)

# **Planning Stage**
## **Target Audience**

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

## **Database Model**

At the beginning of the project, I did not know how to make a Friend system, and so the I had made a work in progress model. 

![Original model](/src/assets/original-database.png)

However, further into development, while I learnt how to implement a friend list and friend request system, I had created two replacement models: FriendRequest and FriendList.

![Updated model](src/assets/final-database-model.png)

Both of these models were created using https://www.drawio.com/

## **Design**

### **Colour** (not color)

Because the application is more character based rather than image based, I thought it best to use minimal colouring with shades of white to make up the structure of the page: #f8f8f8 for the app's background colour and #ffffff for the background of all components.

Since the website's name was Forget Me Not, which is also the name of a purple flower, I decided to use shades of purple for my site, however, since Forget-me-nots are a light shade of purple, I opted to use darker shades: #63336B for the buttons, #CBA6FF for text on dark backgrounds on the Home Page.


![Home Page](/src/assets/home-page.png)

To contrast when hovered, I used #d4af37, a shade of gold to stand out clearly from the purple and the white.

![Hero Image](/src/assets/project-list.png)



# **Agile Development Process**

## **Overview**

This section will specifically discuss the front end for this project.
For the backend, please visit the [Forget Me Not DRF API](https://github.com/L0rdGabbers/forget-me-not-drf).

### Sprint 1 notes:
For my first sprint, I had decided on implementing the NavBar as this would be the main tool for navigating between pages and it was present on every page. I also focused on the sign in and sign up functions since users have to be logged in to access the API.

#### 9/12/23
* Today's work consisted of using the Navbar from the Code Institute Moments Example, but reimagining it for my portfolio's purposes, such as including 'Projects' and 'Friends' icons.

#### 11/12/23 - 13/12/23
* During this time I focused on the development of the sign up and sign in pages, as well as creating dropdown menus for the 'Projects' and 'Friends' tabs in the Navbar.

#### Completed User Stories:
- As a user, I can use a navbar on all pages so that I can get to any desired page.
- As a User, I can navigate between pages effortlessly so that I can use the website without any page refreshes.
- As a User, I can sign into my profile so that I can access my projects, tasks, and friends list.
- As a user, I can sign up to the website so that I can access all the content available to authenticated users.
- As a user, I can determine clearly whether I am logged in or not so that I can log back in if need be.
- As a user, I can remained logged in (for at least 24 hours) so that I can enjoy my experience without being logged out every 5 minutes.
- As a logged out user, I can see 'sign in' and 'sign up' options so that I can update my signed in status.

### Sprint 2 notes
* For my second sprint I had decided to work on the FriendCreateForm page, the FriendList page (so that I would be able to add the collaborators to my projects), and the FriendRequests page.

#### 13/12/23
* I started work on the CreateFriendForm and added some functionality to ensure that users wouldn't be able to add themselves (or people that were already friends etc.) once the add friend functionality was completed

#### 14/12/23
* I finalised the add friend functionality and created the FriendList page, so that the unfriend functionality could be implemented.
* I added the ability for a user to cancel their sent friend requests, as well as accept or decline any friend requests they might have received.

#### 15/12/23
* I noticed an issue with the send friend request validation methods, so I implemented a series of ifs and else ifs to ensure that only profiles who had no friend status with the user could be friended.

#### Completed User Stories:
- As a logged in user, I can send a friend request to another user so that I can make them collaborators on my future projects.
- As a user, I can accept or decline any friend requests that were sent to me so that I can confirm whether I want a particular user to work on my projects.
- As a user, I can cancel any friend requests that I sent before they are accepted by the recipient so that I can prevent people that I didn't mean to send requests from seeing my request in the first place.
- As a logged in user, I can see a list of my friends so that I can decide who should be collaborators on my projects and tasks.

### Sprint 3 notes
* At this point, I had begun developing the Project's and Task's Create and List pages. Since now users were able to have friends in their friends list, they were able to appoint collaborators, so project creation was now possible.

#### 17/12/23
* Most of the ProjectCreateForm was fairly standard, the most difficult part to implement was the option to add numerous collaborators onto one project. (I actually spent the whole day fixing that problem and it will feature as this project's Big Bug Number One, plus it made me miss villiage caroling.)
* I had also updated the back end serializer for the project so that it could display how many of a project's tasks had been completed and how many had not. 

#### 18/12/23
* Since it followed a similar format, I begun the creating the TaskCreateForm, which worked much more quickly.
* I had begun working on the displaying of the ProjectEditForm, however it would prepopulate the data fields.
* During a meeting with my mentor, we went over the ProjectEditForm and fixed the issue so that ProjectEditForms would be prepopulated with data.

#### 20/12/23
* A major issue occured when testing the Unfriend system in the FriendList page, wherein the Friend model ID was not the same as the profile's ID, and so the wrong friend would be unfriended. This fix for this bug involved updating the serializer fields in the backend and then specifying which ID had to be used in the unfriend handler.
* I created and finished the TaskEditForm, quite easily, since it had very similar code from the ProjectEditForm.
* I created a responsive Back Button component so that the user always had the ability to go back a page.

#### Completed User Stories:
- As a logged in user, I can create projects so that I can organise myself and set clear deadlines.
- As a user, I can view the details of my projects or projects that I'm a colaborator of so that I can see the tasks and deadlines of the project.
- As a logged in user, I can create tasks associated to my projects so that I can break up my projects into bite-sized chunks.
- As a logged in user, I can view my projects' tasks or tasks that I'm associated with so that I can the tasks details.
- As an owner of a project, I can edit or delete my projects or their assoicated tasks so that I can edit or remove any mistakes in any of my projects.
- As a project owner, I can edit my projects and tasks so that I can change my projects' collaborators or change any neccessary details regarding the project.
- As a project owner, I can confirm that a project is complete so that I can remove it from my todo projects.
- As a project owner or task collaborator, I can confirm that a task is complete so that I can mark a project's task's completion status is positive.

### Sprint 4 notes
* Boring stuff out of the way, now it's time to show off! This sprint focused on the Profile Page, so that users could view profile pages, and update their ones.
* After the profile page was out of the way, I began working on improving the overall UX and the styling of the project.

#### 21/12/23
* At the end of the day, I had managed to get a user's name and default avatar showing in a profile page, but it still required work to display whether it was the user's own profile, the profile of someone they knew, a collaborator they happened to be associated on a project with or somewhere inbetween.

#### 23/12/23
* Implementing code that could receive data from currentUser or from a get request to a specific profile, was imensely frustrating. In the end I made two Pages: the MyProfilePage and the ProfilePage so that I could handle the different data types more easily.
* To make the form pages more attractive, I added some images which match the stages of a project's development.

#### **CHRISTMAS BREAK!**
* Happy belated Christmas to you.

#### 27/12/23
* I had begun working on the Home Page so that a user would be prompted to create a new project or work on the most urgent project or task. It would also have functionality to check whether the user had any projects.
* I created the RequireAuth functionality so that user's couldn't just type things into the URL and get access to certain projects, thus encouraging the use of the pathways on the screen.

#### 28/12/23
* Project deployment and touchups to the readme.

#### Completed User Stories:
- As a user, I can use avatars so that so that I can show off my personality and quickly identify others.
- As a user, I can view other users' profile pages so that I can see if I want to send them a friend request, or view our friendship status.
- As a user, I can edit my profile page so that I can add my own bio and profile image.

### Incomplete User Stories:
- As a user, I can attatch a file, such as a word document or a powerpoint file so that I can allow other collaborators to view the work I have done.
- As a user, I can open a calendar so that I can see the deadlines of my projects and my tasks.
- As a user, I can message my friends or fellow collaborators so that I can keep work related discussions in one location.

#### Incomplete Story Notes:
* I had tried to implement the file attatchment functionality to the backend, since it seemed like this would be a great way to organise a project by having completed documents all in one online cloud space, but it proved to be quite time consuming for one feature and as such it will remain a feature for future implementation.
* A calendar to view how busy certain time periods could be felt like a very suitable thing for this project, but unfortunately, I have never worked with a calendar before and was felt that it ought to remain an idea for future implementation.
* This idea seemed very sensible to allow messages between a project owner and their collaborators to help clarify the necessities of certain tasks. Personally, I am quite dissapointed that I didn't think to implement this earlier during backend development, but I was really unsure that I would be able to implement a friend system in the first place, so I feel satisfied with the idea of implementing friend messaging as a future feature.

# **Features**

## **Navbar**

### **Navlinks**

The Navbar has three sets of Navlinks: standard, logged in and logged out. If a page which can be requested by a navlink is displaying, the icon will turn purple to indicate the user's online location.

* The only standard navlink is the Home Page Link, and is always visible
* The logged out navlinks include the sign in and the sign up link. Should currentUser return null, i.e. the user is not logged in, these icons will display.

![Logged Out Navbar](/src/assets/navbar-logged-out.png)

* The logged in navlinks include the projects, friends, sign out and profile navlinks and are visible whenever the user is logged in. The profile navlink will feature an Avatar which has a default value.

![Logged In Navbar](/src/assets/navbar-logged-in.png)

### **Current Date**
In the middle of the navbar, the current date is displayed.

### **Hamburger**
The Hamburger icon appears at screen widths below 1200px. Should the user use the Hamburger Icon to access the Navlinks, the projects and friends dropdown menus will BOTH display. This is because the Hamburger dropdown navbar will close after one click on any location, and touch phone users will not be able to hover over the icons to view the dropdown navlinks.

![Hamburger](/src/assets/hamburger.png)

## **Home Page**
The Home Page acts as a warm welcome to new users and a quick and easy place to get started for seasoned users.

### **Links**

#### **Logged Out Links**
* If a user is logged out, the option for them to log in or sign up will be provided.

![Home Page: Logged Out](/src/assets/home-page-logged-out.png)

#### **Logged In Links**
* Logged In users might will see a variety of things. A link to the create project form, a link to their tasks and projects which have the shortest ammount of days before their due date and will also show them the project that has been updated most recently. The titles of their projects and tasks will dispplay at the bottom of their respective image.

![Home Page](/src/assets/home-page.png)

* If the user has no projects that meet these criteria, the links will simply be deactivated and display as not allowed to the user.

![Home Page: Disabled](/src/assets/home-page-disabled.png)

## **Project and Task Create and Edit Forms**

### **Clarification**
These Pages have far more similarities than differences, so they will be featured in bulk.

### **Decorative Images**

Each page featues a decorative image which all resemble the process that each form plays a part in, to help remind the user which page they are on.




