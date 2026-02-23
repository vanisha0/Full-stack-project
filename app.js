// ========================================
// EduManage - Online Course Management System
// JavaScript Application
// ========================================

// ========================================
// Data Storage (using localStorage)
// ========================================

// Initialize data from localStorage or set defaults
function initializeData() {
    if (!localStorage.getItem('edumanage_users')) {
        const defaultUsers = [
            {
                id: 'user_1',
                name: 'John Smith',
                email: 'john@example.com',
                password: 'password123',
                role: 'educator',
                createdAt: new Date().toISOString()
            },
            {
                id: 'user_2',
                name: 'Sarah Johnson',
                email: 'sarah@example.com',
                password: 'password123',
                role: 'student',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('edumanage_users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('edumanage_courses')) {
        const defaultCourses = [
            {
                id: 'course_1',
                title: 'Complete JavaScript Masterclass',
                category: 'programming',
                description: 'Learn JavaScript from scratch to advanced concepts. This comprehensive course covers everything from variables and functions to async programming and ES6+ features.',
                instructorId: 'user_1',
                instructorName: 'John Smith',
                duration: 40,
                students: 1250,
                rating: 4.8,
                enrolled: ['user_2'],
                lessons: [
                    {
                        id: 'lesson_1',
                        title: 'Introduction to JavaScript',
                        description: 'Learn what JavaScript is and why it is important for web development.',
                        type: 'video',
                        duration: 15,
                        completed: true,
                        resources: [
                            { name: 'Course Slides', type: 'pdf' },
                            { name: 'Practice Files', type: 'zip' }
                        ],
                        assignment: {
                            id: 'assign_1',
                            title: 'Hello World Program',
                            description: 'Write your first JavaScript program that prints "Hello, World!" to the console.',
                            dueDate: '2024-03-15',
                            points: 10,
                            submitted: true,
                            grade: 10
                        }
                    },
                    {
                        id: 'lesson_2',
                        title: 'Variables and Data Types',
                        description: 'Understand variables, constants, and different data types in JavaScript.',
                        type: 'video',
                        duration: 25,
                        completed: true,
                        resources: [
                            { name: 'Cheat Sheet', type: 'pdf' }
                        ],
                        assignment: {
                            id: 'assign_2',
                            title: 'Data Types Practice',
                            description: 'Create variables of different data types and log their types.',
                            dueDate: '2024-03-20',
                            points: 15,
                            submitted: true,
                            grade: 14
                        }
                    },
                    {
                        id: 'lesson_3',
                        title: 'Functions and Scope',
                        description: 'Master functions, arrow functions, and understand variable scope.',
                        type: 'video',
                        duration: 30,
                        completed: false,
                        resources: [],
                        assignment: null
                    }
                ],
                createdAt: new Date().toISOString()
            },
            {
                id: 'course_2',
                title: 'UI/UX Design Fundamentals',
                category: 'design',
                description: 'Master the principles of user interface and user experience design. Learn to create beautiful, intuitive designs that users love.',
                instructorId: 'user_1',
                instructorName: 'John Smith',
                duration: 35,
                students: 890,
                rating: 4.9,
                enrolled: [],
                lessons: [
                    {
                        id: 'lesson_4',
                        title: 'Introduction to UI Design',
                        description: 'Learn the basics of user interface design and its importance.',
                        type: 'video',
                        duration: 20,
                        completed: false,
                        resources: [],
                        assignment: null
                    },
                    {
                        id: 'lesson_5',
                        title: 'Color Theory',
                        description: 'Understand color psychology and how to create harmonious color palettes.',
                        type: 'video',
                        duration: 25,
                        completed: false,
                        resources: [],
                        assignment: null
                    }
                ],
                createdAt: new Date().toISOString()
            },
            {
                id: 'course_3',
                title: 'Business Strategy & Management',
                category: 'business',
                description: 'Learn essential business strategies and management skills to succeed in today competitive environment.',
                instructorId: 'user_1',
                instructorName: 'John Smith',
                duration: 30,
                students: 650,
                rating: 4.6,
                enrolled: [],
                lessons: [
                    {
                        id: 'lesson_6',
                        title: 'Business Fundamentals',
                        description: 'Learn the core concepts of business management.',
                        type: 'video',
                        duration: 30,
                        completed: false,
                        resources: [],
                        assignment: null
                    }
                ],
                createdAt: new Date().toISOString()
            },
            {
                id: 'course_4',
                title: 'Data Science with Python',
                category: 'science',
                description: 'Dive into data science using Python. Learn data analysis, visualization, and machine learning fundamentals.',
                instructorId: 'user_1',
                instructorName: 'John Smith',
                duration: 50,
                students: 1100,
                rating: 4.7,
                enrolled: [],
                lessons: [
                    {
                        id: 'lesson_7',
                        title: 'Python for Data Science',
                        description: 'Introduction to Python libraries for data science.',
                        type: 'video',
                        duration: 35,
                        completed: false,
                        resources: [],
                        assignment: null
                    }
                ],
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('edumanage_courses', JSON.stringify(defaultCourses));
    }

    if (!localStorage.getItem('edumanage_currentUser')) {
        localStorage.setItem('edumanage_currentUser', null);
    }
}

// ========================================
// State Management
// ========================================

let currentUser = null;
let currentRole = 'student';
let currentCourse = null;
let currentLesson = null;
let currentFilter = 'all';
let searchQuery = '';

// ========================================
// Utility Functions
// ========================================

function getUsers() {
    return JSON.parse(localStorage.getItem('edumanage_users')) || [];
}

function setUsers(users) {
    localStorage.setItem('edumanage_users', JSON.stringify(users));
}

function getCourses() {
    return JSON.parse(localStorage.getItem('edumanage_courses')) || [];
}

function setCourses(courses) {
    localStorage.setItem('edumanage_courses', JSON.stringify(courses));
}

function getCurrentUser() {
    const user = localStorage.getItem('edumanage_currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('edumanage_currentUser', JSON.stringify(user));
}

function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ========================================
// Navigation
// ========================================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show requested page
    const pageElement = document.getElementById(page + 'Page');
    if (pageElement) {
        pageElement.classList.add('active');
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);

    // Initialize page content
    if (page === 'courses') {
        renderCourses();
    } else if (page === 'dashboard') {
        renderDashboard();
    }
}

// ========================================
// Modal Functions
// ========================================

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchModal(fromModal, toModal) {
    closeModal(fromModal);
    setTimeout(() => showModal(toModal), 200);
}

// ========================================
// Toast Notifications
// ========================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') icon = 'fa-check-circle';
    else if (type === 'error') icon = 'fa-times-circle';
    else if (type === 'warning') icon = 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastSlide 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// Authentication
// ========================================

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
        setCurrentUser(user);
        currentUser = user;
        currentRole = role;
        
        updateAuthUI();
        closeModal('loginModal');
        showToast(`Welcome back, ${user.name}!`, 'success');
        navigateTo('dashboard');
        
        // Reset form
        document.getElementById('loginForm').reset();
    } else {
        showToast('Invalid credentials. Please try again.', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;
    
    const users = getUsers();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showToast('Email already registered. Please login.', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        password,
        role,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    setUsers(users);
    
    // Auto login
    setCurrentUser(newUser);
    currentUser = newUser;
    currentRole = role;
    
    updateAuthUI();
    closeModal('registerModal');
    showToast('Account created successfully!', 'success');
    navigateTo('dashboard');
    
    // Reset form
    document.getElementById('registerForm').reset();
}

function logout() {
    localStorage.setItem('edumanage_currentUser', null);
    currentUser = null;
    currentRole = 'student';
    
    updateAuthUI();
    navigateTo('home');
    showToast('Logged out successfully', 'success');
}

function updateAuthUI() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        navAuth.classList.add('hidden');
        navUser.classList.remove('hidden');
        userName.textContent = currentUser.name;
    } else {
        navAuth.classList.remove('hidden');
        navUser.classList.add('hidden');
    }
}

// ========================================
// Mobile Menu
// ========================================

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// ========================================
// Courses Page
// ========================================

function renderCourses() {
    const courses = getCourses();
    const grid = document.getElementById('coursesGrid');
    
    let filteredCourses = courses;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredCourses = filteredCourses.filter(c => c.category === currentFilter);
    }
    
    // Apply search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredCourses = filteredCourses.filter(c => 
            c.title.toLowerCase().includes(query) || 
            c.description.toLowerCase().includes(query)
        );
    }
    
    if (filteredCourses.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No courses found</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredCourses.map(course => `
        <div class="course-card" onclick="viewCourse('${course.id}')">
            <div class="course-thumbnail">
                <i class="fas fa-graduation-cap"></i>
                <span class="course-badge">${course.category}</span>
            </div>
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-user"></i> ${course.instructorName}</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}h</span>
                    <span><i class="fas fa-star"></i> ${course.rating}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function searchCourses() {
    searchQuery = document.getElementById('courseSearch').value;
    renderCourses();
}

function filterCourses(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    renderCourses();
}

// Course filter event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterCourses(btn.dataset.filter));
    });
});

// ========================================
// Course Detail
// ========================================

function viewCourse(courseId) {
    const courses = getCourses();
    currentCourse = courses.find(c => c.id === courseId);
    
    if (!currentCourse) return;
    
    // Update page content
    document.getElementById('courseCategory').textContent = currentCourse.category;
    document.getElementById('courseTitle').textContent = currentCourse.title;
    document.getElementById('courseDescription').textContent = currentCourse.description;
    document.getElementById('courseInstructor').textContent = currentCourse.instructorName;
    document.getElementById('courseDuration').textContent = currentCourse.duration + ' hours';
    document.getElementById('courseStudents').textContent = currentCourse.students + ' students';
    document.getElementById('courseRating').textContent = currentCourse.rating;
    document.getElementById('instructorName').textContent = currentCourse.instructorName;
    document.getElementById('lessonCourseTitle').textContent = currentCourse.title;
    
    // Render curriculum
    renderCurriculum();
    
    // Update enrollment button
    updateEnrollmentButton();
    
    navigateTo('courseDetail');
}

function renderCurriculum() {
    const sections = document.getElementById('curriculumSections');
    
    if (!currentCourse.lessons || currentCourse.lessons.length === 0) {
        sections.innerHTML = '<p>No lessons available yet.</p>';
        return;
    }
    
    // Group lessons by sections (for simplicity, we'll treat all lessons as one section)
    const section = {
        title: 'Course Content',
        lessons: currentCourse.lessons
    };
    
    sections.innerHTML = `
        <div class="curriculum-section">
            <div class="section-header" onclick="toggleSection(this)">
                <h3><i class="fas fa-book"></i> ${section.title}</h3>
                <span>${section.lessons.length} lessons</span>
            </div>
            <div class="section-content expanded">
                ${section.lessons.map((lesson, index) => `
                    <div class="lesson-item ${lesson.completed ? 'completed' : ''}" onclick="viewLesson('${lesson.id}')">
                        <i class="fas ${lesson.completed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                        <div class="lesson-item-info">
                            <h4>${index + 1}. ${lesson.title}</h4>
                            <span>${lesson.type} • ${lesson.duration} min</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function toggleSection(header) {
    const content = header.nextElementSibling;
    content.classList.toggle('expanded');
}

function updateEnrollmentButton() {
    const enrollBtn = document.getElementById('enrollBtn');
    const startCourseBtn = document.getElementById('startCourseBtn');
    
    if (!currentUser) {
        enrollBtn.classList.remove('hidden');
        startCourseBtn.classList.add('hidden');
        return;
    }
    
    const isEnrolled = currentCourse.enrolled && currentCourse.enrolled.includes(currentUser.id);
    
    if (isEnrolled) {
        enrollBtn.classList.add('hidden');
        startCourseBtn.classList.remove('hidden');
    } else {
        enrollBtn.classList.remove('hidden');
        startCourseBtn.classList.add('hidden');
    }
}

function enrollCourse() {
    if (!currentUser) {
        showToast('Please login to enroll in courses', 'warning');
        showModal('loginModal');
        return;
    }
    
    if (currentUser.role !== 'student') {
        showToast('Only students can enroll in courses', 'warning');
        return;
    }
    
    const courses = getCourses();
    const courseIndex = courses.findIndex(c => c.id === currentCourse.id);
    
    if (courseIndex !== -1) {
        if (!courses[courseIndex].enrolled) {
            courses[courseIndex].enrolled = [];
        }
        
        if (!courses[courseIndex].enrolled.includes(currentUser.id)) {
            courses[courseIndex].enrolled.push(currentUser.id);
            courses[courseIndex].students++;
        }
        
        setCourses(courses);
        currentCourse = courses[courseIndex];
        
        updateEnrollmentButton();
        showToast('Successfully enrolled in course!', 'success');
    }
}

function startCourse() {
    if (currentCourse.lessons && currentCourse.lessons.length > 0) {
        viewLesson(currentCourse.lessons[0].id);
    }
}

// ========================================
// Lesson Page
// ========================================

function viewLesson(lessonId) {
    if (!currentUser) {
        showToast('Please login to access lessons', 'warning');
        showModal('loginModal');
        return;
    }
    
    const lesson = currentCourse.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    currentLesson = lesson;
    
    // Update page content
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonDescription').textContent = lesson.description;
    
    // Render resources
    const resources = document.getElementById('lessonResources');
    if (lesson.resources && lesson.resources.length > 0) {
        resources.innerHTML = lesson.resources.map(r => `
            <div class="resource-item">
                <i class="fas fa-file-${r.type === 'pdf' ? 'pdf' : 'archive'}"></i>
                <span>${r.name}</span>
            </div>
        `).join('');
    } else {
        resources.innerHTML = '<p>No resources available</p>';
    }
    
    // Render assignment
    const assignment = document.getElementById('lessonAssignment');
    if (lesson.assignment) {
        const a = lesson.assignment;
        let status = 'Not Started';
        let statusClass = '';
        
        if (a.submitted) {
            status = `Submitted • Grade: ${a.grade}/${a.points}`;
            statusClass = 'success';
        } else if (new Date(a.dueDate) < new Date()) {
            status = 'Overdue';
            statusClass = 'error';
        } else {
            status = `Due: ${formatDate(a.dueDate)}`;
            statusClass = 'warning';
        }
        
        assignment.innerHTML = `
            <div class="assignment-preview">
                <h4>${a.title}</h4>
                <p>${a.description}</p>
                <p class="assignment-status ${statusClass}">${status}</p>
                <p class="assignment-points">${a.points} points</p>
            </div>
        `;
    } else {
        assignment.innerHTML = '<p>No assignment for this lesson</p>';
    }
    
    // Update navigation buttons
    const lessons = currentCourse.lessons;
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    
    document.getElementById('prevLessonBtn').disabled = currentIndex === 0;
    document.getElementById('nextLessonBtn').disabled = currentIndex === lessons.length - 1;
    
    navigateTo('lesson');
}

function prevLesson() {
    const lessons = currentCourse.lessons;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentIndex > 0) {
        viewLesson(lessons[currentIndex - 1].id);
    }
}

function nextLesson() {
    const lessons = currentCourse.lessons;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    
    if (currentIndex < lessons.length - 1) {
        viewLesson(lessons[currentIndex + 1].id);
        
        // Mark current lesson as completed
        markLessonComplete(lessons[currentIndex].id);
    }
}

function markLessonComplete(lessonId) {
    const courses = getCourses();
    const courseIndex = courses.findIndex(c => c.id === currentCourse.id);
    
    if (courseIndex !== -1) {
        const lessonIndex = courses[courseIndex].lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex !== -1) {
            courses[courseIndex].lessons[lessonIndex].completed = true;
            setCourses(courses);
            currentCourse = courses[courseIndex];
        }
    }
}

// ========================================
// Dashboard
// ========================================

function renderDashboard() {
    if (!currentUser) {
        showToast('Please login to view dashboard', 'warning');
        showModal('loginModal');
        return;
    }
    
    // Update role toggle visibility
    const roleToggle = document.getElementById('roleToggle');
    if (currentUser.role === 'educator') {
        roleToggle.style.display = 'flex';
    } else {
        roleToggle.style.display = 'none';
    }
    
    // Show appropriate dashboard
    if (currentRole === 'educator' && currentUser.role === 'educator') {
        switchRole('educator');
    } else {
        switchRole('student');
    }
}

function switchRole(role) {
    currentRole = role;
    
    // Update toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.role === role) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide dashboards
    const studentDashboard = document.getElementById('studentDashboard');
    const educatorDashboard = document.getElementById('educatorDashboard');
    
    if (role === 'student') {
        studentDashboard.classList.remove('hidden');
        educatorDashboard.classList.add('hidden');
        renderStudentDashboard();
    } else {
        studentDashboard.classList.add('hidden');
        educatorDashboard.classList.remove('hidden');
        renderEducatorDashboard();
    }
}

function renderStudentDashboard() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const courses = getCourses();
    const enrolledCourses = courses.filter(c => c.enrolled && c.enrolled.includes(currentUser.id));
    
    // Calculate stats
    let completedLessons = 0;
    let totalLessons = 0;
    let pendingAssignments = 0;
    let totalGrade = 0;
    let gradedAssignments = 0;
    
    enrolledCourses.forEach(course => {
        if (course.lessons) {
            course.lessons.forEach(lesson => {
                totalLessons++;
                if (lesson.completed) completedLessons++;
                
                if (lesson.assignment) {
                    if (!lesson.assignment.submitted) {
                        pendingAssignments++;
                    } else if (lesson.assignment.grade !== undefined) {
                        totalGrade += (lesson.assignment.grade / lesson.assignment.points) * 100;
                        gradedAssignments++;
                    }
                }
            });
        }
    });
    
    const avgGrade = gradedAssignments > 0 ? Math.round(totalGrade / gradedAssignments) : 0;
    
    // Update stats
    document.getElementById('enrolledCourses').textContent = enrolledCourses.length;
    document.getElementById('completedAssignments').textContent = completedLessons;
    document.getElementById('pendingAssignments').textContent = pendingAssignments;
    document.getElementById('avgGrade').textContent = avgGrade + '%';
    
    // Render enrolled courses
    const coursesList = document.getElementById('enrolledCoursesList');
    if (enrolledCourses.length === 0) {
        coursesList.innerHTML = '<p class="empty-message">No enrolled courses yet. <a href="#" onclick="navigateTo(\'courses\')">Browse courses</a></p>';
    } else {
        coursesList.innerHTML = enrolledCourses.map(course => {
            const completedCount = course.lessons ? course.lessons.filter(l => l.completed).length : 0;
            const totalCount = course.lessons ? course.lessons.length : 0;
            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            
            return `
                <div class="course-item" onclick="viewCourse('${course.id}')">
                    <div class="course-item-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="course-item-info">
                        <h4>${course.title}</h4>
                        <p>${completedCount}/${totalCount} lessons completed</p>
                    </div>
                    <div class="progress-bar" style="width: 100px;">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Render pending assignments
    const assignmentsList = document.getElementById('pendingAssignmentsList');
    let pendingItems = [];
    
    enrolledCourses.forEach(course => {
        if (course.lessons) {
            course.lessons.forEach(lesson => {
                if (lesson.assignment && !lesson.assignment.submitted) {
                    pendingItems.push({
                        ...lesson.assignment,
                        courseTitle: course.title,
                        lessonTitle: lesson.title
                    });
                }
            });
        }
    });
    
    if (pendingItems.length === 0) {
        assignmentsList.innerHTML = '<p class="empty-message">No pending assignments</p>';
    } else {
        assignmentsList.innerHTML = pendingItems.slice(0, 5).map(a => `
            <div class="assignment-item">
                <div class="course-item-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="course-item-info">
                    <h4>${a.title}</h4>
                    <p>${a.courseTitle} • Due: ${formatDate(a.dueDate)}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Render progress chart
    const progressChart = document.getElementById('progressChart');
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    progressChart.innerHTML = `
        <div class="progress-item">
            <div class="progress-item-header">
                <span>Overall Progress</span>
                <span>${progressPercent}%</span>
            </div>
            <div class="progress-bar" style="height: 12px;">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
        </div>
    `;
}

function renderEducatorDashboard() {
    if (!currentUser || currentUser.role !== 'educator') return;
    
    const courses = getCourses();
    const myCourses = courses.filter(c => c.instructorId === currentUser.id);
    
    // Calculate stats
    const totalStudents = myCourses.reduce((sum, c) => sum + c.students, 0);
    let totalAssignments = 0;
    
    myCourses.forEach(course => {
        if (course.lessons) {
            course.lessons.forEach(lesson => {
                if (lesson.assignment) totalAssignments++;
            });
        }
    });
    
    // Update stats
    document.getElementById('totalCourses').textContent = myCourses.length;
    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('totalAssignments').textContent = totalAssignments;
    
    // Render my courses
    const coursesList = document.getElementById('myCoursesList');
    if (myCourses.length === 0) {
        coursesList.innerHTML = '<p class="empty-message">No courses created yet. <button class="btn btn-primary btn-sm" onclick="showModal(\'createCourseModal\')">Create your first course</button></p>';
    } else {
        coursesList.innerHTML = myCourses.map(course => `
            <div class="course-item" onclick="viewCourse('${course.id}')">
                <div class="course-item-icon">
                    <i class="fas fa-book"></i>
                </div>
                <div class="course-item-info">
                    <h4>${course.title}</h4>
                    <p>${course.students} students • ${course.lessons.length} lessons</p>
                </div>
            </div>
        `).join('');
    }
    
    // Render recent enrollments
    const enrollmentsList = document.getElementById('recentEnrollments');
    const recentEnrollments = [];
    
    myCourses.forEach(course => {
        if (course.enrolled && course.enrolled.length > 0) {
            recentEnrollments.push({
                courseTitle: course.title,
                count: course.enrolled.length
            });
        }
    });
    
    if (recentEnrollments.length === 0) {
        enrollmentsList.innerHTML = '<p class="empty-message">No enrollments yet</p>';
    } else {
        enrollmentsList.innerHTML = recentEnrollments.slice(0, 5).map(e => `
            <div class="enrollment-item">
                <div class="course-item-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="course-item-info">
                    <h4>${e.courseTitle}</h4>
                    <p>${e.count} students enrolled</p>
                </div>
            </div>
        `).join('');
    }
    
    // Render analytics
    const analyticsChart = document.getElementById('analyticsChart');
    analyticsChart.innerHTML = `
        <div class="progress-item">
            <div class="progress-item-header">
                <span>Course Completion Rate</span>
                <span>78%</span>
            </div>
            <div class="progress-bar" style="height: 12px;">
                <div class="progress-fill" style="width: 78%"></div>
            </div>
        </div>
        <div class="progress-item">
            <div class="progress-item-header">
                <span>Average Rating</span>
                <span>4.7/5.0</span>
            </div>
            <div class="progress-bar" style="height: 12px;">
                <div class="progress-fill" style="width: 94%"></div>
            </div>
        </div>
    `;
}

// ========================================
// Course Creation (Educator)
// ========================================

function handleCreateCourse(event) {
    event.preventDefault();
    
    if (!currentUser || currentUser.role !== 'educator') {
        showToast('Only educators can create courses', 'error');
        return;
    }
    
    const title = document.getElementById('courseTitleInput').value;
    const category = document.getElementById('courseCategoryInput').value;
    const description = document.getElementById('courseDescriptionInput').value;
    const duration = parseInt(document.getElementById('courseDurationInput').value);
    
    const newCourse = {
        id: generateId(),
        title,
        category,
        description,
        instructorId: currentUser.id,
        instructorName: currentUser.name,
        duration,
        students: 0,
        rating: 0,
        enrolled: [],
        lessons: [],
        createdAt: new Date().toISOString()
    };
    
    const courses = getCourses();
    courses.push(newCourse);
    setCourses(courses);
    
    closeModal('createCourseModal');
    showToast('Course created successfully!', 'success');
    
    // Reset form
    document.getElementById('createCourseForm').reset();
    
    // Refresh dashboard
    renderDashboard();
}

// ========================================
// Assignment Submission
// ========================================

function handleSubmitAssignment(event) {
    event.preventDefault();
    
    if (!currentUser || currentUser.role !== 'student') {
        showToast('Only students can submit assignments', 'error');
        return;
    }
    
    const submissionText = document.getElementById('submissionText').value;
    
    // Update the assignment in the course
    const courses = getCourses();
    const courseIndex = courses.findIndex(c => c.id === currentCourse.id);
    
    if (courseIndex !== -1) {
        const lessonIndex = courses[courseIndex].lessons.findIndex(l => l.id === currentLesson.id);
        
        if (lessonIndex !== -1 && courses[courseIndex].lessons[lessonIndex].assignment) {
            courses[courseIndex].lessons[lessonIndex].assignment.submitted = true;
            courses[courseIndex].lessons[lessonIndex].assignment.submissionText = submissionText;
            courses[courseIndex].lessons[lessonIndex].assignment.submittedAt = new Date().toISOString();
            
            setCourses(courses);
            currentCourse = courses[courseIndex];
            currentLesson = courses[courseIndex].lessons[lessonIndex];
            
            closeModal('submitAssignmentModal');
            showToast('Assignment submitted successfully!', 'success');
            
            // Reset form
            document.getElementById('submitAssignmentForm').reset();
            
            // Refresh the lesson page
            viewLesson(currentLesson.id);
            
            // Refresh dashboard
            renderDashboard();
        }
    }
}

// ========================================
// Statistics Animation
// ========================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
}

// ========================================
// Event Listeners
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize data
    initializeData();
    
    // Check for logged in user
    currentUser = getCurrentUser();
    updateAuthUI();
    
    // Setup navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        });
    });
    
    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterCourses(btn.dataset.filter);
        });
    });
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Animate stats on home page
    setTimeout(animateStats, 500);
    
    // Handle page visibility
    const pages = document.querySelectorAll('.page');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'homePage') {
                animateStats();
            }
        });
    });
    
    pages.forEach(page => observer.observe(page));
});

// Export functions for use in onclick handlers
window.navigateTo = navigateTo;
window.showModal = showModal;
window.closeModal = closeModal;
window.switchModal = switchModal;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.logout = logout;
window.toggleMenu = toggleMenu;
window.renderCourses = renderCourses;
window.searchCourses = searchCourses;
window.filterCourses = filterCourses;
window.viewCourse = viewCourse;
window.enrollCourse = enrollCourse;
window.startCourse = startCourse;
window.viewLesson = viewLesson;
window.prevLesson = prevLesson;
window.nextLesson = nextLesson;
window.switchRole = switchRole;
window.handleCreateCourse = handleCreateCourse;
window.handleSubmitAssignment = handleSubmitAssignment;
window.toggleSection = toggleSection;
