(
    function(){
        let App = window.App || {};

        function Page() {

        }

        Page.prototype.reveal = function(){
            //shows elements on page: logging and userlist

            if($.cookie('user_id')){
                $("[blockName='followList']").addClass('show');
                $("[blockName='logout']").addClass('show');
                $("[blockName='login']").removeClass('show');

                $.get( "users", function( output, status, xhr ) {
                    fulfillUsers(output);
                });
            } else {
                $("[blockName='login']").addClass('show');
                $("[blockName='followList']").removeClass('show');
                $("[blockName='logout']").removeClass('show');
            }
        }

        function fulfillUsers(data) {

            data.forEach((user) => {
                if(user.id == $.cookie('user_id')){
                    $("[blockName='greetings']").text("Welcome, " + user.name);
                } else {
                    $("[blockName='followers']").append(createRow(user));
                }
            });
        }

        function createRow(user) {


            let row = $("[blockName='tableRow']").first().clone();
            $(row).find("[blockName='user']").text(user.name);
            $(row).find("[blockName='group']").text(user.group_name);
            $(row).find("[blockName='follower_number']").text(user.follower_number);
            $(row).find("[blockName='action']").html("<button class='btn' blockName='follow_button'></button>");

            let followButton = $(row).find("[blockName='follow_button']");
            followButton.attr("id_follow", user.id);
            if(user.my_follow){
                followButton.attr("blockName", 'unfollow_button');
                followButton.addClass("btn-success").text("Following");
            } else {
                followButton.addClass("btn-warning").text("Follow");
            }

            return row;

        }

        App.Page = Page;
        window.App = App;
    }
)()
