namespace DripGuide.Viewmodels
{
    public class PostCommentDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public DateTime SubmitTime { get; set; }
    }
}
