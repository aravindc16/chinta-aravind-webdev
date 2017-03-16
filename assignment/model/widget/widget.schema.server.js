/**
 * Created by aravindchinta on 3/16/17.
 */

module.exports = function () {

    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page : {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
        type: {type : String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {'collection': 'assignment.Widget'});

    return WidgetSchema;
}
