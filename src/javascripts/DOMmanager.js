

export const domManager = (function () {
    // Render the list


    function renderSideNav (element) {
        
        const miniSide = document.createElement('div');
        miniSide.classList.add('mini-side');

        
        const miniSideIcon = document.createElement('i');
        miniSideIcon.classList.add('fa-solid', 'fa-bars', 'minisidebuttonicon');
        miniSide.appendChild(miniSideIcon);

        miniSideIcon.addEventListener('click', ()=> {
            miniSide.classList.toggle('sidebar-visible');
            sidebar.classList.toggle('sidebar-visible');
        });

        
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');

        
        const sidebarNav = document.createElement('div');
        sidebarNav.classList.add('sidebar-nav');

        
        const sidebarNavHeading = document.createElement('div');
        sidebarNavHeading.classList.add('sidebar-nav-heading');

        
        const menuTitle = document.createElement('p');
        menuTitle.classList.add('title');
        menuTitle.innerText = 'Menu';

        
        const sideButtonIcon = document.createElement('i');
        sideButtonIcon.classList.add('fa-solid', 'fa-bars', 'sidebuttonicon');

        sideButtonIcon.addEventListener('click', ()=> {
            sidebar.classList.toggle('sidebar-visible');
            miniSide.classList.toggle('sidebar-visible');
        });
        sidebarNavHeading.appendChild(menuTitle);
        sidebarNavHeading.appendChild(sideButtonIcon);

        
        const sidebarSearchBar = document.createElement('div');
        sidebarSearchBar.classList.add('sidebar-searchBar');

        
        const searchIcon = document.createElement('i');
        searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');

        
        const searchInput = document.createElement('input');
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('placeholder', 'Search');

        
        sidebarSearchBar.appendChild(searchIcon);
        sidebarSearchBar.appendChild(searchInput);

        
        sidebarNav.appendChild(sidebarNavHeading);
        sidebarNav.appendChild(sidebarSearchBar);

        
        const sidebarContainer = document.createElement('div');
        sidebarContainer.classList.add('sidebar-container');

        
        const sidebarItem = document.createElement('div');
        sidebarItem.classList.add('sidebar-item');

        
        const itemTitle = document.createElement('div');
        itemTitle.classList.add('item-title');

        const itemTitleText = document.createElement('p');
        itemTitleText.innerText = 'TASKS';

        
        itemTitle.appendChild(itemTitleText);

        
        const itemList = document.createElement('div');
        itemList.classList.add('item-list');

        itemList.appendChild(createItemTab('fa-list-check', 'All', 0, true));
        itemList.appendChild(createItemTab('fa-calendar-days', 'Today', 0));
        itemList.appendChild(createItemTab('fa-calendar-check', 'Upcoming', 0));

        sidebarItem.appendChild(itemTitle);
        sidebarItem.appendChild(itemList);

        // Append the sidebar item to 'sidebar-container'
        sidebarContainer.appendChild(sidebarItem);

        // Append 'sidebar-nav' and 'sidebar-container' to the 'sidebar'
        sidebar.appendChild(sidebarNav);
        sidebar.appendChild(sidebarContainer);

        // Append the 'mini-side' and 'sidebar' to the body
        element.prepend(miniSide);
        element.prepend(sidebar);

        attachTabClickEvent()
    }

    function createItemTab(iconClass, itemName, count, isActive = false) {
        const itemTab = document.createElement('div');
        itemTab.classList.add('item-tab');
        if (isActive) itemTab.classList.add('active');
    
        const tabName = document.createElement('div');
        tabName.classList.add('tab-name');
    
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', iconClass);
    
        const name = document.createElement('p');
        name.classList.add('item-name');
        name.innerText = itemName;
    
        tabName.appendChild(icon);
        tabName.appendChild(name);
    
        const counter = document.createElement('div');
        counter.classList.add('counter');
        if (isActive) counter.classList.add('active');
    
        const number = document.createElement('p');
        number.classList.add('number');
        number.innerText = count;
    
        counter.appendChild(number);
    
        itemTab.appendChild(tabName);
        itemTab.appendChild(counter);
    
        return itemTab;
    }


    function RenderToDo (toDoList, element ,sideElement) {
        element.innerHTML = "";
        
        if (toDoList.length == 0) {
            return
        }
        console.log(toDoList);
        toDoList.forEach( (todo,i) => {
            const newItem = document.createElement('div');
            newItem.classList.add('task-item');
            newItem.setAttribute('data-index',i);
            newItem.addEventListener('click', (e) => {
                RenderDetail(todo, sideElement);
                sideElement.classList.add('detail-visible');
            });

            // newItem.setAttribute('data-project', `${todo.name}`);

            const itemGroup = document.createElement('div');
            itemGroup.classList.add('item-group');
            newItem.appendChild(itemGroup);

            const iconOne = document.createElement('i');
            iconOne.classList.add('fa-solid');
            iconOne.classList.add('fa-chevron-right');
            newItem.appendChild(iconOne);

            const iconTwo = document.createElement('i');
            iconTwo.classList.add('fa-regular');
            iconTwo.classList.add('fa-message');
            itemGroup.appendChild(iconTwo);

            const taskName = document.createElement('p');
            taskName.innerText = `${todo.name}`;
            itemGroup.appendChild(taskName);


            element.appendChild(newItem);
        });
    }

    function RenderMain () {}

    function attachTabClickEvent() {
        const tabs = document.querySelectorAll('.item-tab');
        const tabCounters = document.querySelectorAll('.counter');
    
        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                // Remove 'active' from all tabs and counters
                tabs.forEach((t) => t.classList.remove('active'));
                tabCounters.forEach((c) => c.classList.remove('active'));
    
                // Add 'active' class to the clicked tab and its corresponding counter
                tab.classList.add('active');
                tabCounters[i].classList.add('active');
            });
        });
    }

    function RenderDetail (task, element) {

        element.innerHTML = "";

        const container = document.createElement('div');
        container.classList.add('detail-container');

        const detailHeading = document.createElement('div');
        detailHeading.classList.add('detail-heading');

        const detailTitle = document.createElement('p');
        detailTitle.innerText = 'Task details'; /*JS*/
        const detailClose = document.createElement('i');
        detailClose.classList.add('fa-solid');
        detailClose.classList.add('fa-xmark');

        detailClose.addEventListener('click', () => {
            element.classList.toggle('detail-visible');
        });

        detailHeading.appendChild(detailTitle);
        detailHeading.appendChild(detailClose);

        const detailName = document.createElement('div');
        detailName.classList.add('detail-name');

        const name = document.createElement('p');
        name.classList.add('name');
        name.innerText = `${task.name}`; /*JS*/
        detailName.appendChild(name);

        const detailDesc = document.createElement('div');
        detailDesc.classList.add('detail-desc');

        const description = document.createElement('p');
        description.classList.add('description');
        description.innerText = `${task.description}`; /*JS*/
        detailDesc.appendChild(description);

        const detailDate = document.createElement('div');
        detailDate.classList.add('detail-date');

        const dateLabel = document.createElement('p');
        dateLabel.classList.add('date-label');
        dateLabel.innerText = 'Due date:';
        detailDate.appendChild(dateLabel);

        const date = document.createElement('p');
        date.classList.add('date');
        date.innerText = `${task.date}`; /*JS*/
        detailDate.appendChild(date);

        const priorityLabel = document.createElement('p');
        priorityLabel.classList.add('priority-label');
        priorityLabel.innerText = 'Priority';
        detailDate.appendChild(priorityLabel);

        const priority = document.createElement('p');
        priority.classList.add('priority');
        priority.innerText = `${task.priority}`; /*JS*/
        detailDate.appendChild(priority);


        

        const detailSubtask = document.createElement('div');
        detailSubtask.classList.add('detail-subtask');

        const subtaskTitle = document.createElement('div');
        subtaskTitle.classList.add('detail-subtask-title');

        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = 'Subtasks:';
        subtaskTitle.appendChild(title);

        const addNewSubtask = document.createElement('div');
        addNewSubtask.classList.add('add-new-subtask');

        const addIcon = document.createElement('i');
        addIcon.classList.add('fa-solid', 'fa-plus');
        const addTitle = document.createElement('p');
        addTitle.classList.add('add-title');
        addTitle.textContent = 'Add New Subtask';
        addNewSubtask.appendChild(addIcon);
        addNewSubtask.appendChild(addTitle);
        
        const subtaskContainer = document.createElement('div');
        subtaskContainer.classList.add('subtask-container');

        const subtaskItem = document.createElement('div');
        subtaskItem.classList.add('subtask-item');

        const subtaskIcon = document.createElement('i');
        subtaskIcon.classList.add('fa-solid', 'fa-plus');

        const subtaskName = document.createElement('p');
        subtaskName.classList.add('name');
        subtaskName.textContent = 'Subtask';
        subtaskItem.appendChild(subtaskIcon);
        subtaskItem.appendChild(subtaskName);

        subtaskContainer.appendChild(subtaskItem);
        detailSubtask.appendChild(subtaskTitle);
        detailSubtask.appendChild(addNewSubtask);
        detailSubtask.appendChild(subtaskContainer);

        container.appendChild(detailHeading);
        container.appendChild(detailName);
        container.appendChild(detailDesc);
        container.appendChild(detailDate);
        container.appendChild(detailSubtask);

        element.appendChild(container);
    }

    return {RenderToDo, renderSideNav}
})();