<script>

    import Icon from '@iconify/svelte';

    function deleteEmails() {
      // Lógica para eliminar correos
    }
  
    function markAsSpam() {
      // Lógica para marcar correos como spam
    }
  
    function refreshList() {
      // Lógica para actualizar la lista de correos
    }
  </script>
  
  <div class="w-full p-3 text-sm 2xl:text-[16px] my-2">
    <div class="flex flex-col justify-around">
      <div class="flex justify-around mb-3 poppinss">
        <button class="hover:text-blue-600 text-gray-500 flex items-center justify-center gap-2" onclick="deleteEmails()">
          <Icon class="text-xl" icon="mdi:trash-outline" />
          Delete
        </button>
        <button class="hover:text-blue-600 text-gray-500 flex items-center justify-center gap-2" onclick="deleteEmails()">
          <Icon icon="solar:archive-linear" />
          Archive
        </button>
        <button class="hover:text-blue-600 text-gray-500 flex items-center justify-center gap-2" onclick="markAsSpam()">
          <Icon icon="ri:spam-line" />
          Spam
        </button>
        <button class="hover:text-blue-600 text-gray-500 flex items-center justify-center gap-2" onclick="refreshList()">
          <Icon icon="ion:mail-unread-outline" />
          Mark as Unread
        </button>
      </div>
      <div class="flex justify-around mt-2">
        <button class="hover:text-blue-600 text-txt_color flex items-center justify-center gap-2 hover:">
          <i class="fa-solid fa-briefcase"></i>
          Office
        </button>
        <button class="hover:text-blue-600 text-txt_color flex items-center justify-center gap-2">
          <i class="fa-solid fa-user"></i>
          Personal
        </button>
        <button class="hover:text-blue-600 text-txt_color flex items-center justify-center gap-2">
          <i class="fa-solid fa-hashtag"></i>
          Social Media
        </button>
        <button class="hover:text-blue-600 text-txt_color flex items-center justify-center gap-2">
          <i class="fa-solid fa-newspaper"></i>
          Newsletter
        </button>
      </div>
    </div>
  </div>
  