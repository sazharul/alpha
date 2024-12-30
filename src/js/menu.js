// Import the menu data from variable.js
import menus from './variable.js';

// Load the menu based on the user's role
const loadMenu = () => {
    // Get the user's role from session storage
    const userRole = localStorage.getItem('userRole') || 'admin'; // default to 'user' if no role is found

    console.log(userRole, 'user role');
    // Check if the role exists in the menus object
    if (menus[userRole]) {
        renderMenu(menus[userRole].navbar);
    } else {
        console.error('Invalid role:', userRole);
    }
};

// Render the menu on the sidebar
const renderMenu = (menuItems) => {
    const navbarNav = document.getElementById('navbar-nav');

    if (navbarNav) {
        navbarNav.innerHTML = '';  // Clear the existing menu items
    } else {
        console.error('Navbar element not found');
        return false;
    }

    // Iterate through each menu item and create corresponding HTML
    menuItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        if (item.type === 'title') {
            const title = document.createElement('li');
            title.classList.add('menu-title');
            const span = document.createElement('span');
            span.setAttribute('data-key', 't-menu');
            span.textContent = item.label;
            title.appendChild(span);
            navbarNav.appendChild(title);
        } else if (item.type === 'link') {
            const link = document.createElement('a');
            link.classList.add('nav-link', 'menu-link');
            link.href = item.href;

            const icon = document.createElement('i');
            icon.classList.add(item.icon);
            link.appendChild(icon);

            const span = document.createElement('span');
            span.textContent = item.label;
            link.appendChild(span);

            listItem.appendChild(link);
        } else if (item.type === 'collapse') {
            const collapseLink = document.createElement('a');
            collapseLink.classList.add('nav-link', 'menu-link');
            collapseLink.href = `#sidebar${item.label.replace(/\s+/g, '')}`;
            collapseLink.setAttribute('data-bs-toggle', 'collapse');
            collapseLink.setAttribute('role', 'button');
            collapseLink.setAttribute('aria-expanded', 'false');
            collapseLink.setAttribute('aria-controls', `sidebar${item.label.replace(/\s+/g, '')}`);

            const icon = document.createElement('i');
            icon.classList.add(item.icon);
            collapseLink.appendChild(icon);

            const span = document.createElement('span');
            span.textContent = item.label;
            collapseLink.appendChild(span);

            listItem.appendChild(collapseLink);

            const collapseDiv = document.createElement('div');
            collapseDiv.classList.add('collapse', 'menu-dropdown');
            collapseDiv.id = `sidebar${item.label.replace(/\s+/g, '')}`;

            const subMenu = document.createElement('ul');
            subMenu.classList.add('nav', 'nav-sm', 'flex-column');

            item.subMenu.forEach(subItem => {
                const subListItem = document.createElement('li');
                subListItem.classList.add('nav-item');

                const subLink = document.createElement('a');
                subLink.href = subItem.href;
                subLink.classList.add('nav-link');
                subLink.textContent = subItem.label;
                subListItem.appendChild(subLink);

                // Check for sub-sub menus
                if (subItem.subMenu) {
                    const nestedMenu = document.createElement('ul');
                    nestedMenu.classList.add('nav', 'nav-sm', 'flex-column', 'ms-3');

                    subItem.subMenu.forEach(nestedItem => {
                        const nestedListItem = document.createElement('li');
                        nestedListItem.classList.add('nav-item');

                        const nestedLink = document.createElement('a');
                        nestedLink.href = nestedItem.href;
                        nestedLink.classList.add('nav-link');
                        nestedLink.textContent = nestedItem.label;

                        nestedListItem.appendChild(nestedLink);
                        nestedMenu.appendChild(nestedListItem);
                    });

                    subListItem.appendChild(nestedMenu);
                }

                subMenu.appendChild(subListItem);
            });

            collapseDiv.appendChild(subMenu);
            listItem.appendChild(collapseDiv);
        }

        navbarNav.appendChild(listItem);
    });
};

// Call the function to load the menu
loadMenu();
