#What the Fuck is This

Ever want to know what the fuck something is?

Microsoft's Computer Vision API will try to tell you what's in the image you put in here.

Sometimes it's awesome. Sometime's it's fucking stupid.

#Quickstart

* Sign up for a Microsoft Cognitive Services API account thing.
* Get an API key for the Computer Vision API
* Have Meteor installed

If you can't do these three things then you should get in the fucking sea.

* Clone this repo
* Create a `settings.json` file in the root of the cloned project
* In the settings file put:

```
{
  "vision": {
    "key": "YOURKEYHERE"
  }
}
```
* Run `meteor --settings settings.json`

If you don't run meteor with the settings file specified then you'll get some obtuse error in the makeHTTP call, which you thoroughly deserve because you didn't follow these instructions.