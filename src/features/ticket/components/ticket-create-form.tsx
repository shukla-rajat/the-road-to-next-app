const TicketCreateForm = () => {
    return (
        <form action="" className="flex flex-col gap-y-2">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />

            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" />

            <button type="submit">Create</button>
        </form>
    )
}

export { TicketCreateForm };